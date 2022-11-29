import styled from "styled-components";
import imgSave from "../../img/check.svg"

export const Input = styled.input`
    display: flex;
    align-items: center;
    border: none;
    padding: 0 15px;
    margin-right: 30px;
    width: 100%;
    min-height: 32px;
    font-size: 16px;
    color:  var(--color-shark);
`

export const InputEdit = styled.input`
    display: flex;
    width: 100%;
    background-color: transparent;
    border: none;
    font-size: 18px;
    color:  var(--color-aliceblue);
`

export const InputLabel = styled.label`
  margin-right: 15px;
  cursor: pointer;
  height: 32px;
  width: 32px;
  position: relative;

    &::before {
        position: absolute;
            content: " ";
            top: 0;
            left: 0;
            height: 32px;
            width: 32px;
            border: 1px solid var(--color-aliceblue);
            }


`
export const InputCheckBox = styled.input`
     position: absolute;
     clip: rect(0 0 0 0);
     width: 1px;
     height: 1px;
     margin: -1px;

    // &:checked + ${InputLabel}::after{
    //     position: absolute;
    //     content: " ";
    //     top: 0;
    //     left: 0;
    //     height: 32px;
    //     width: 32px;
    //     background-image: url(${imgSave});
    //     background-size: 30px 30px;
    //     background-repeat: no-repeat;
    //     background-position: center;
    //   }

    &:checked + ${InputLabel}{
        background: red;
      }
`

export const Label = styled.label`
  background: red;
  display: block;
  padding: 1rem;
`;

export const Input2 = styled.input`
  &:checked + ${Label} {
    background: blue;
  }
`;