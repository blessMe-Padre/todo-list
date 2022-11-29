import styled from "styled-components";

export const TaskListStyled = styled.ul`
    margin: 0;
    padding: 0;
`

export const TaskItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 600px;
    border-bottom: 1px solid var(--color-aliceblue);
    margin-bottom: 25px;
`

export const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
    max-width: 600px;
`
