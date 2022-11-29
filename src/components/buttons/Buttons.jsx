import styled from "styled-components";
import imgDelete from "../../img/trash.svg"
import imgEdit from "../../img/edit.svg"
import imgSave from "../../img/check.svg"
import imgAdd from "../../img/plus.svg"

export const Button = styled.button`
    border: none;
    cursor: pointer;
    background-position: 50% 50%;
    background-color: transparent;
    background-repeat: no-repeat;
    width: 32px;
    height: 32px;
    padding: 0;
`
export const ButtonDelete = styled(Button)`
    background-image: url(${imgDelete});
`

export const ButtonEdit = styled(Button)`
    background-image: url(${imgEdit});
`

export const ButtonSave = styled(Button)`
    background-image: url(${imgSave});
`

export const ButtonAdd = styled(Button)`
    background-image: url(${imgAdd});
`