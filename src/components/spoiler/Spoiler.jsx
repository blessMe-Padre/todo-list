import React from 'react';
import { useState, useEffect } from 'react';

import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';

import { SpoilerWrapper } from "./styled"

export default function Spoiler({ isOpenSpoiler, id }) {
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
            alert('изображение загружено');
        }).catch((error) => {
            console.log("не удалось загрузить изображение", error);
        });
    };

    const deleteImages = () => {
        // получает ссылку на задачу (в которую вложены все изображения)
        const listRef = ref(storage, `images/${id}`);
        listAll(listRef)
            .then((res) => {
                res.items.forEach((item) => {
                    deleteObject(item);
                });
                alert('Изображения удалены');
            }).catch((error) => {
                console.log("не удалось удалить", error);
            });
    }

    useEffect(() => {
        listAll(imageRefList).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        });
    }, [])

    console.log(imageList);

    return (
        <SpoilerWrapper isOpenSpoiler={isOpenSpoiler} >
            <input
                type="file"
                onChange={(evt) => { setImageUpload(evt.target.files[0]) }}
            />

            <button
                onClick={uploadImages}
            >загрузить файл</button>

            <button
                onClick={deleteImages}
            >удалить файлы</button>

            {
                imageList.map((url) => {
                    return <img key={url} src={url} alt="" />;
                })
            }
        </SpoilerWrapper>
    )
}
