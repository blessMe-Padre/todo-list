import { useState } from 'react';

import { data } from './data'
import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';
import { PageWrapper, Title } from './components/page-wrapper/Page-wrapper';



function App() {
  const [tasks, setTasks] = useState(data);
  const [inputValue, setInputValue] = useState('');

  const generateId = () => (Math.random().toString(16).slice(2) + new Date().getTime().toString(36));

  const taskAdd = (title) => {
    if (inputValue) {
      setTasks([
        {
          id: generateId(),
          title,
          completed: false
        },
        ...tasks,
      ]);
    }
  }

  const taskRemove = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (

    <PageWrapper>
      <Title>Список дел</Title>

      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        taskAdd={taskAdd}
      />
      <TaskList
        taskRemove={taskRemove}
        setTasks={setTasks}
        tasks={tasks}
      />
    </PageWrapper>
  );
}

export default App;
