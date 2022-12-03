import { useState, useEffect } from 'react';

import { db } from './firebaseConfig';
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';

import Search from './components/search/Search';
import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';
import { PageWrapper, Title } from './components/page-wrapper/Page-wrapper';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');

  const time = new Date().toLocaleString();

  const getAllDocument = async function () {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    const taskList = querySnapshot.docs.map(doc => doc.data());
    return taskList;
  }

  useEffect(() => {
    getAllDocument().then(setTasks).catch(error => {
      console.log("ошибка подключения", error);
    });
  }, [])

  const onTaskAdd = async (title) => {
    if (inputValue) {
      const task = doc(collection(db, "Tasks"));
      await setDoc(task, {
        id: task.id,
        title: title,
        completed: false,
        time: time,
        timestamp: serverTimestamp()
      });
    }

    getAllDocument().then(setTasks);
  }

  return (
    <PageWrapper>
      <Title>Список дел</Title>

      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        taskAdd={onTaskAdd}
      />

      <Search
        setTasks={setTasks}
        search={search}
        setSearch={setSearch}
      />

      <TaskList
        search={search}
        setTasks={setTasks}
        tasks={tasks}
        getAllDocument={getAllDocument}
      />
    </PageWrapper>
  );
}

export default App;
