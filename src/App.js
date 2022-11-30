import { useState, useEffect } from 'react';

import { data } from './data'
import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';
import { PageWrapper, Title } from './components/page-wrapper/Page-wrapper';
import Search from './components/search/Search';



function App() {
  const [tasks, setTasks] = useState(data);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

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

  const handleSearch = (search) => {
    let filteredTasks = [...tasks];
    filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
    setTasks(filteredTasks);
    console.log(filteredTasks);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleSearch(search);
  }, [search]);


  return (

    <PageWrapper>
      <Title>Список дел</Title>
      <Search
        setTasks={setTasks}
        search={search}
        setSearch={setSearch}
      />

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
