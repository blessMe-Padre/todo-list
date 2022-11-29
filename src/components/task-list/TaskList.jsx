import React from 'react';
import { useState } from 'react';

export default function TaskList({ tasks, setTasks, taskRemove }) {
    const [isEditMode, setEditMode] = useState();
    const [value, setValue] = useState('');


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

    const onEdited = (id, inputValue) => {
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
            <ul>
                {tasks.length <= 0 && (<p>Список задач пуст</p>)}

                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
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
                                    value={value}
                                    onChange={(evt) => {
                                        setValue(evt.target.value);
                                    }
                                    }

                                />
                            ) : (<span>{task.title}</span>)}

                            {isEditMode === task.id ? (
                                <button
                                    onClick={() => {
                                        onEdited(task.id, value);
                                        setEditMode(false);
                                    }}
                                    arial-label="Сохранить"
                                >
                                    Сохранить
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setEditMode(task.id);
                                        setValue(task.title)
                                    }}
                                    arial-label="Редактировать"
                                >
                                    Редактировать
                                </button>
                            )}

                            <button
                                onClick={() => {
                                    taskRemove(task.id)
                                }}
                                arial-label="Удалить"
                            >
                                удалить
                            </button>
                        </li>
                    )
                })
                }
            </ul>
        </section >
    )
}
