import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { db } from '../../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";

import Spoiler from "../spoiler/Spoiler"

import { ButtonDelete, ButtonEdit, ButtonSave, ButtonSpoilerClose, ButtonSpoilerOpen } from '../buttons/Buttons';
import { InputEdit, InputLabel, InputCheckBox } from '../input/Input';
import { TaskItem, TaskWrapper, TaskButtonsWrapper, TaskListStyled, TaskText, TaskTime, TaskSpan } from './styled';

export default function TaskList({ tasks, setTasks, taskRemove, search, getAllDocument }) {
    const [isEditMode, setEditMode] = useState();
    const [value, setValue] = useState('');
    const [isOpenSpoiler, setOpenSpoiler] = useState();


    const editTitleInputRef = useRef(null)
    useEffect(() => {
        if (isEditMode && editTitleInputRef) {
            editTitleInputRef.current.focus();
        }
    }, [isEditMode])


    const onEditTaskToggle = async (id, task) => {
        const item = doc(db, "Tasks", id);
        await updateDoc(item, {
            completed: !task.completed,
        });
    }

    const toggleTaskCompleted = (id) => {
        tasks.map(
            task => {
                if (task.id !== id) return task;
                onEditTaskToggle(id, task);
                getAllDocument().then(setTasks);
                return setTasks(tasks)
            }
        )
    }

    const onEditTaskTitle = async (id, inputValue) => {
        const item = doc(db, "Tasks", id);
        await updateDoc(item, {
            title: inputValue,
        });
    }

    const taskEdited = (id, inputValue) => {
        tasks.map(task => {
            if (task.id !== id) return task;
            onEditTaskTitle(id, inputValue);
            getAllDocument().then(setTasks);
            return setTasks(tasks)
        }
        );
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
                                        toggleTaskCompleted(task.id);
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
                                            taskEdited(task.id, value);
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
                                            taskRemove(task.id);
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
                                isOpenSpoiler={isOpenSpoiler}
                            />
                        ) : ('')}

                    </TaskItem>
                ))
            }
        </TaskListStyled>
    )
}
