import styled from "styled-components";

export const TaskListStyled = styled.ul`
    margin: 0;
    padding: 0;
`

export const TaskItem = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 600px;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
    margin-bottom: 25px;
`

export const TaskTime = styled.p`
    position: absolute;
    top: -15px;
    left: 47px;
    margin: 0;
    padding: 0;
    font-size: 10px;
    opacity: 0.8;
`

export const TaskWrapperLeft = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
`

export const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
`
