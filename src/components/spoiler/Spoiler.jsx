import React from 'react';
import { useState, useEffect } from 'react';

import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

import { SpoilerWrapper } from "./styled"

export default function Spoiler({ isOpenSpoiler, id }) {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);

    // получает ссылку на список файлов из БД
    const imageRefList = ref(storage, "images/");


    const uploadImages = () => {
        if (imageUpload == null) return;

        //генерирует новый путь и имя к файлу
        const imageRef = ref(storage, `images/${imageUpload.name + id}`);

        //загружает файл в БД из состояния "imageUpload" по пути "imageRef"
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('изображение загружено');
        });
    };


    useEffect(() => {
        listAll(imageRefList).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                })
            })
        });
    }, [])


    return (
        <SpoilerWrapper isOpenSpoiler={isOpenSpoiler} >
            <input
                type="file"
                onChange={(evt) => { setImageUpload(evt.target.files[0]) }}
            />

            <button
                onClick={uploadImages}
            >загрузить файл</button>

            {
                imageList.map((url) => {
                    return <img key={url} src={url} alt="" />;
                })
            }
        </SpoilerWrapper>
    )
}
