import React from 'react';

import { ButtonAdd } from '../buttons/Buttons';
import { Input } from '../input/Input';
import { FormStyled } from './styled';


export default function Form({ inputValue, setInputValue, taskAdd }) {
    const formHandler = (event) => {
        event.preventDefault();
    }

    return (
        <FormStyled onSubmit={formHandler}>
            <Input
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
        </FormStyled>
    )
}
