import React from 'react';
import { useState, useEffect } from 'react';

import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import { SpoilerWrapper } from "./styled"

export default function Spoiler({ isOpenSpoiler, setOpenSpoiler, id, deleteImages }) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    // получает ссылку на список файлов из БД
    const imageRefList = ref(storage, `images/${id}`);

    const uploadImages = () => {
        if (imageUpload == null) return;

        //генерирует новый путь и имя файла
        const imageRef = ref(storage, `images/${id}/${imageUpload.name + id}`);

        //загружает файл в БД из состояния "imageUpload" по пути "imageRef"
        uploadBytes(imageRef, imageUpload).then(() => {
            // alert('изображение загружено');
        }).catch((error) => {
            console.log("не удалось загрузить изображение", error);
        });
    };

    const getImagesList = () => {
        listAll(imageRefList).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        });
    }

    useEffect(() => {
        getImagesList();
    }, [])

    return (
        <SpoilerWrapper isOpenSpoiler={isOpenSpoiler} >
            <input
                type="file"
                onChange={(evt) => { setImageUpload(evt.target.files[0]) }}
            />

            <button
                onClick={() => {
                    uploadImages();
                    alert("Файл загружен");
                    setTimeout(() => {
                        getImagesList();
                    }, 300);
                }}
            >загрузить файл</button>

            <button
                onClick={() => {
                    deleteImages(id);
                    alert("Файлы удалены");
                    setOpenSpoiler(false);
                }}
            >удалить файлы</button>

            {
                imageList.map((url) => {
                    return <img key={url} src={url} alt="" />;
                })
            }
        </SpoilerWrapper>
    )
}
