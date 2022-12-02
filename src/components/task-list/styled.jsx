import styled from "styled-components";

export const TaskListStyled = styled.ul`
    margin: 0;
    padding: 0;
`

export const TaskItem = styled.li`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 600px;
    font-size: 18px;
    line-height: 20px;
    border-bottom: 2px solid var(--color-aliceblue);
    padding-bottom: 15px;
    margin-bottom: 25px;
`

export const TaskTime = styled.p`
    position: absolute;
    bottom: 0;
    left: 35px;
    margin: 0;
    font-size: 10px;
    opacity: 0.8;
`

export const TaskWrapperLeft = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 6px;
    width: 80%;
`

export const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
`
export const TaskSpan = styled.span`
    padding-bottom: 10px;
`