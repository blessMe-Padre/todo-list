import styled from "styled-components";

export const TaskListStyled = styled.ul`
    margin: 0;
    padding: 0;
`

export const TaskItem = styled.li`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid var(--color-aliceblue);
    margin-bottom: 20px;
`
export const TaskWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 600px;
    font-size: calc(10px + 2vmin);
    line-height: 1.2;
    padding-bottom: 25px;
    margin-bottom: 10px;
`

export const TaskTime = styled.p`
    position: absolute;
    bottom: 15px;
    left: 36px;
    margin: 0;
    font-size: 10px;
    opacity: 0.8;
`

export const TaskText = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 6px;
    width: 80%;
`

export const TaskButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 64px;
`
export const TaskSpan = styled.span`
    padding-bottom: 10px;
`
