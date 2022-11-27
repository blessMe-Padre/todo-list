import React from 'react';

export default function Form({ inputValue, setInputValue, taskAdd }) {
    const formHandler = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={formHandler}>
            <input
                type="text"
                value={inputValue}
                placeholder="введите задачу"
                onChange={(evt) => {
                    setInputValue(evt.target.value);
                }}
            />
            <button
                type="submit"
                onClick={() => {
                    taskAdd(inputValue);
                    setInputValue('')
                }}
            >
                добавить
            </button>
        </form>
    )
}
