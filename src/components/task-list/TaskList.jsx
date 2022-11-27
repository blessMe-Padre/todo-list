import React from 'react';

export default function TaskList({ tasks, setTasks, taskRemove }) {
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

    return (
        <section>
            <ul>
                {tasks.length <= 0 && (<p>Список задач пуст</p>)}

                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input
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

                            <span>{task.title}</span>

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
