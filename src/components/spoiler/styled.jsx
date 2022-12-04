import styled from "styled-components";

export const SpoilerWrapper = styled.div`
    font-size: calc(10px + 1vmin);
    padding: 20px 0 10px;
    border-top: 2px solid var(--color-aliceblue);
    margin-bottom: 20px;
`
export const SpoilerControls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SpoilerInputs = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 25px;
`

export const SpoilerInput = styled.input`
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
`

export const Label = styled.label`
    display: block;
    box-sizing: border-box;
    min-width: 60px;
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

export const Span = styled.span`
    margin: 0 10px;
`
