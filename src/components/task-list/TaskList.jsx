import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { db } from '../../firebaseConfig';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { storage } from '../../firebaseConfig';
import { ref, listAll, deleteObject } from 'firebase/storage';

import Spoiler from "../spoiler/Spoiler"

import { ButtonDelete, ButtonEdit, ButtonSave, ButtonSpoilerClose, ButtonSpoilerOpen } from '../buttons/Buttons';
import { InputEdit, InputLabel, InputCheckBox } from '../input/Input';
import { TaskItem, TaskWrapper, TaskButtonsWrapper, TaskListStyled, TaskText, TaskTime, TaskSpan } from './styled';

export default function TaskList({ tasks, setTasks, search, getAllDocument }) {
    const [isEditMode, setEditMode] = useState();
    const [value, setValue] = useState('');
    const [isOpenSpoiler, setOpenSpoiler] = useState();


    const editTitleInputRef = useRef(null)
    useEffect(() => {
        if (isEditMode && editTitleInputRef) {
            editTitleInputRef.current.focus();
        }
    }, [isEditMode])


    const onToggleTaskCompleted = (id) => {
        const item = doc(db, "Tasks", id);
        tasks.map(
            async task => {
                if (task.id !== id) return task;
                await updateDoc(item, {
                    completed: !task.completed,
                });
                getAllDocument().then(setTasks);
                return setTasks(tasks)
            }
        )
    }

    const onTaskEdited = (id, inputValue) => {
        const item = doc(db, "Tasks", id);
        tasks.map(async task => {
            if (task.id !== id) return task;
            await updateDoc(item, {
                title: inputValue,
            });
            getAllDocument().then(setTasks);
            return setTasks(tasks)
        }
        );
    }

    const deleteImages = (id) => {
        // получает ссылку на задачу (в которую вложены все изображения)
        const listRef = ref(storage, `images/${id}`);
        listAll(listRef)
            .then((res) => {
                res.items.forEach((item) => {
                    deleteObject(item);
                    console.log("изображения удалены");
                });
            }).catch((error) => {
                console.log("не удалось удалить", error);
            });
    }

    const onTaskRemove = (id) => {
        const item = doc(db, "Tasks", id);
        tasks.filter(
            async task => {
                if (task.id !== id) return task;
                await deleteDoc(item);
                getAllDocument().then(setTasks);
                deleteImages(id);
                return setTasks(tasks)
            }
        )
    }



    return (
        <TaskListStyled>
            {tasks.length <= 0 && (<p>Список задач пуст</p>)}

            {tasks
                .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
                .sort((a, b) => a - b)
                .map((task) => (
                    <TaskItem key={task.id}>
                        <TaskWrapper>
                            <TaskText>
                                <TaskTime>{task.time}</TaskTime>
                                <InputCheckBox
                                    key={task.id}
                                    id={task.id}
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        onToggleTaskCompleted(task.id);
                                    }} />
                                <InputLabel htmlFor={task.id} />

                                {isEditMode === task.id ? (
                                    <InputEdit
                                        type="text"
                                        ref={editTitleInputRef}
                                        value={value}
                                        onChange={(evt) => {
                                            setValue(evt.target.value);
                                        }} />
                                ) : (<TaskSpan>{task.title}</TaskSpan>)}
                            </TaskText>

                            <TaskButtonsWrapper>
                                {isEditMode === task.id ? (
                                    <ButtonSave
                                        onClick={() => {
                                            onTaskEdited(task.id, value);
                                            setEditMode(false);
                                        }}
                                        arial-label="Сохранить" />
                                ) : (
                                    <ButtonEdit
                                        onClick={() => {
                                            setEditMode(task.id);
                                            setValue(task.title);
                                        }}
                                        arial-label="Редактировать" />
                                )}

                                <ButtonDelete
                                    onClick={() => {
                                        if (window.confirm("Удалить задачу?")) {
                                            onTaskRemove(task.id);
                                        }
                                    }}
                                    arial-label="Удалить" />


                                {isOpenSpoiler === task.id ? (
                                    <ButtonSpoilerClose
                                        onClick={() => { setOpenSpoiler(false) }}
                                        arial-label="закрыть" />
                                ) : (

                                    <ButtonSpoilerOpen
                                        onClick={() => { setOpenSpoiler(task.id) }}
                                        arial-label="прикрепить файл" />
                                )}
                            </TaskButtonsWrapper>
                        </TaskWrapper>

                        {isOpenSpoiler === task.id ? (
                            <Spoiler
                                id={task.id}
                                isOpenSpoiler={isOpenSpoiler}
                                setOpenSpoiler={setOpenSpoiler}
                                deleteImages={deleteImages}
                            />
                        ) : ('')}

                    </TaskItem>
                ))
            }
        </TaskListStyled>
    )
}
