import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { ButtonDelete, ButtonEdit, ButtonSave } from '../buttons/Buttons';
import { InputEdit, InputLabel, InputCheckBox } from '../input/Input';
import { TaskItem, TaskWrapper, TaskListStyled, TaskWrapperLeft } from './styled';

export default function TaskList({ tasks, setTasks, taskRemove, search }) {
    const [isEditMode, setEditMode] = useState();
    const [value, setValue] = useState('');
    const editTitleInputRef = useRef(null)

    useEffect(() => {
        if (isEditMode && editTitleInputRef) {
            editTitleInputRef.current.focus();
        }
    }, [isEditMode])


    const toggleTaskCompleted = (id) => {
        setTasks(
            tasks.map(
                task => {
                    if (task.id !== id) return task;

                    return {
                        ...task,
                        completed: !task.completed,
                    }
                }
            )
        );
    }

    const taskEdited = (id, inputValue) => {
        setTasks(
            tasks.map(
                task => {
                    if (task.id !== id) return task;

                    return {
                        ...task,
                        title: inputValue,
                        id: task.id
                    }
                }
            )
        );
    }

    return (
        <section>
            <TaskListStyled>
                {tasks.length <= 0 && (<p>Список задач пуст</p>)}

                {tasks
                    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
                    // .sort((a, b) => a.completed - b.completed)
                    .map((task) => (
                        <TaskItem key={task.id}>
                            <TaskWrapperLeft>
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
                                ) : (<span>{task.title}</span>)}
                            </TaskWrapperLeft>
                            <TaskWrapper>
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
                            </TaskWrapper>
                        </TaskItem>
                    ))
                }
            </TaskListStyled>
        </section >
    )
}
