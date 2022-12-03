import { useState, useEffect } from 'react';

import { db } from './firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import Search from './components/search/Search';
import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';
import { PageWrapper, Title } from './components/page-wrapper/Page-wrapper';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const time = new Date().toLocaleString();

  useEffect(() => {
    getAllDocument().then(setTasks);
  }, [])

  const getDeletedDocument = async function (id) {
    const querySnapshot = await deleteDoc(doc(db, "Tasks", id));
    return querySnapshot;
  }

  const onTaskRemove = (id) => {
    getDeletedDocument(id).then(setTasks(tasks.filter((task) => task.id !== id)));
  }




  const getAllDocument = async function () {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    const taskList = querySnapshot.docs.map(doc => doc.data());

    return taskList;
  }

  const taskAdd = async (title) => {
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
        taskAdd={taskAdd}
      />

      <Search
        setTasks={setTasks}
        search={search}
        setSearch={setSearch}
      />
      <TaskList
        search={search}
        taskRemove={onTaskRemove}
        setTasks={setTasks}
        tasks={tasks}
        getAllDocument={getAllDocument}
      />
    </PageWrapper>
  );
}

export default App;
