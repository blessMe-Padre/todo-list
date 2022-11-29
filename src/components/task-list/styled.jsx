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

export const TaskWrapperLeft = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
`

export const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
`
