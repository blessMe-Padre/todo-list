import styled from "styled-components";

export const SpoilerWrapper = styled.div`
padding: 0;
margin-bottom: 20px;
`

export const SpoilerInput = styled.input`
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
`

export const Label = styled.label`
    width: 60px;
    height: 32px;
    border: 2px dashed var(--color-aliceblue);
    background-color: transparent;
    color: var(--color-aliceblue);
    padding: 10px 20px;
    cursor: pointer;
`

export const ImgList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
export const ImgItem = styled.li`
    margin-top: 30px;
`
export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
