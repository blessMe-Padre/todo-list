import React from 'react';

import { ButtonInputRemove } from '../buttons/Buttons';
import { FormStyledSearch } from '../form/styled';
import { InputSearch } from '../input/Input';

export default function Search({ search, setSearch }) {

    return (
        <FormStyledSearch>
            <InputSearch
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
                }}
                arial-label="Очистить поиск"
            />
        </FormStyledSearch>
    )
}
