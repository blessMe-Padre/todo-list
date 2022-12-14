import React from 'react';
import { useState, useEffect } from 'react';

import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'

import { SpoilerWrapper, SpoilerControls, SpoilerInputs, SpoilerInput, Label, ImgList, ImgItem, Img, Span } from "./styled"
import { ButtonUploadFile } from '../../components/buttons/Buttons'


export default function Spoiler({ isOpenSpoiler, setOpenSpoiler, id, deleteImages }) {
    const [imageUpload, setImageUpload] = useState();
    const [imageList, setImageList] = useState([]);


    /**
     * FIXME:
     *   - исправить ошибку key для картинок
     *  - сделать кнопку загрузить disable
     */

    // получает ссылку на список файлов из БД
    const imageRefList = ref(storage, `images/${id}`);

    const uploadImages = () => {
        if (imageUpload == null) return;

        //генерирует новый путь и имя файла
        const imageRef = ref(storage, `images/${id}/${imageUpload.name + v4()}`);

        //загружает файл в БД из состояния "imageUpload" по пути "imageRef"
        uploadBytes(imageRef, imageUpload).then(() => {
            // alert('изображение загружено');
        }).catch((error) => {
            console.log("не удалось загрузить изображение", error);
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
            <SpoilerControls>
                <SpoilerInputs>
                    <Label>
                        <SpoilerInput
                            type="file"
                            accept='image/jpeg, image/png'
                            onChange={(evt) => {
                                setImageUpload(evt.target.files[0]);
                            }}
                        />
                        <span>{imageUpload ? `имя файла: ${imageUpload.name}` : 'click to upload '}</span>
                    </Label>

                    <Span>{imageUpload ? "" : "Выберите файл"}</Span>
                </SpoilerInputs>
                <div>
                    <ButtonUploadFile
                        disabled={!imageUpload}
                        onClick={() => {
                            uploadImages();
                            alert("Файл загружен");
                            setOpenSpoiler(false);
                        }}
                    >загрузить файл</ButtonUploadFile>

                    <ButtonUploadFile
                        disabled={imageList.length === 0}
                        onClick={() => {
                            deleteImages(id);
                            alert("Файлы удалены");
                            setOpenSpoiler(false);
                        }}
                    >удалить файлы</ButtonUploadFile>
                </div>
            </SpoilerControls>
            <ImgList>
                {
                    imageList.map((url) => {
                        return <ImgItem key={v4()}><Img src={url} alt="" /></ImgItem>;
                    })
                }
            </ImgList>
        </SpoilerWrapper>
    )
}
