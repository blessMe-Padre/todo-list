import React from 'react';
import { data } from '../../data'

import imgSearch from "../../img/search.svg"
import { ButtonInputRemove } from '../buttons/Buttons';
import { FormStyled } from '../form/styled';
import { Input } from '../input/Input';

export default function Search({ search, setSearch, setTasks }) {

    return (
        <FormStyled>
            <Input
                type="text"
                placeholder="Поиск"
                onChange={(evt) => {
                    setSearch(evt.target.value)
                }}
                value={search}
            />
            <ButtonInputRemove
                onClick={() => {
                    setSearch('');
                    setTasks(data);
                }}
                arial-label="Очистить поиск"
            />
            <img src={imgSearch} alt="Поиск" />
        </FormStyled>
    )
}
