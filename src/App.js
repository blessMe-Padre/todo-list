import { useState } from 'react';

import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const generateId = () => (Math.random().toString(16).slice(2) + new Date().getTime().toString(36));

  const taskAdd = (title) => {
    if (inputValue) {
      setTasks([
        ...tasks,
        {
          id: generateId(),
          title,
          completed: false
        }
      ]);
    }
  }

  const taskRemove = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <article>
      <h1>Список дел</h1>
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
    </article>
  );
}

export default App;
