import React from 'react';

import { ButtonAdd } from '../buttons/Buttons';

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
            <ButtonAdd
                type="submit"
                onClick={() => {
                    taskAdd(inputValue);
                    setInputValue('')
                }}
                arial-label="Добавить"
            />
        </form>
    )
}
