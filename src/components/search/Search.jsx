import React from 'react';

import { ButtonSearch } from '../buttons/Buttons';
import { FormStyled } from '../form/styled';
import { Input } from '../input/Input';

export default function Search({ search, setSearch }) {

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
            <ButtonSearch
                type="submit"
                arial-label="Поиск"
            />
        </FormStyled>
    )
}
