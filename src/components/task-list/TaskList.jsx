import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { ButtonDelete, ButtonEdit, ButtonSave } from '../buttons/Buttons';
import { TaskItem, TaskWrapper, TaskListStyled } from './styled';

export default function TaskList({ tasks, setTasks, taskRemove }) {
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

                {tasks.map((task) => {
                    return (
                        <TaskItem key={task.id}>
                            <TaskWrapper>
                                <input
                                    key={task.id}
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => {
                                        toggleTaskCompleted(task.id);
                                    }
                                    }
                                />

                                {isEditMode === task.id ? (
                                    < input
                                        type="text"
                                        ref={editTitleInputRef}
                                        value={value}
                                        onChange={(evt) => {
                                            setValue(evt.target.value);
                                        }
                                        }

                                    />
                                ) : (<span>{task.title}</span>)}
                            </TaskWrapper>
                            <TaskWrapper>
                                {isEditMode === task.id ? (
                                    <ButtonSave
                                        onClick={() => {
                                            taskEdited(task.id, value);
                                            setEditMode(false);
                                        }}
                                        arial-label="Сохранить"
                                    />
                                ) : (
                                    <ButtonEdit
                                        onClick={() => {
                                            setEditMode(task.id);
                                            setValue(task.title)
                                        }}
                                        arial-label="Редактировать"
                                    />
                                )}

                                <ButtonDelete
                                    onClick={() => {
                                        taskRemove(task.id)
                                    }}
                                    arial-label="Удалить"
                                />
                            </TaskWrapper>
                        </TaskItem>
                    )
                })
                }
            </TaskListStyled>
        </section >
    )
}
