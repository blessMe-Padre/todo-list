import React from 'react';
import { useState } from 'react';

export default function TaskList({ tasks, setTasks, taskRemove }) {
    const [isEditMode, setEditMode] = useState(false);
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

    const onEdited = (id, value) => {
        setTasks(tasks.map((task) => task.id === id ? {
            title: value
        } : task));
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
                                    setTimeout(() => {
                                        taskRemove(task.id)
                                    }, 2000);
                                }
                                }
                            />

                            {isEditMode ? (
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(evt) => {
                                        setValue(evt.target.value);
                                    }
                                    }

                                />
                            ) : (<span>{task.title}</span>)}

                            {isEditMode ? (
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
                                        setEditMode(!isEditMode)
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
