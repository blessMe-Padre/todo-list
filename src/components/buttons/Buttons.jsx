import styled from "styled-components";
import imgDelete from "../../img/trash.svg"
import imgEdit from "../../img/edit.svg"
import imgSave from "../../img/check.svg"
import imgAdd from "../../img/plus.svg"
import imgRemove from "../../img/plus-black.svg"
import imgOpen from "../../img/open.svg"

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

export const ButtonInputRemove = styled(Button)`
    position: absolute;
    top: 0;
    right: 15px;
    background-image: url(${imgRemove});
    transform: rotate(45deg);
`

export const ButtonSpoilerOpen = styled(Button)`
    position: absolute;
    bottom: 10px;
    right: 0;
    background-image: url(${imgOpen});
`

export const ButtonSpoilerClose = styled(Button)`
    position: absolute;
    bottom: 10px;
    right: 0px;
    background-image: url(${imgAdd});
    transform: rotate(45deg);
`

export const ButtonUploadFile = styled.button`
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 3px;
    color: var(--color-shark);
    transition: color 0.3s ease-in;
    margin: 0 10px;

    &:hover {
        color: var(--color-blue);
    }

    &:disabled {
        color: #c2c2c2;
        cursor: auto;
    }
`