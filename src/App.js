import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

import Form from './components/form/Form';
import TaskList from './components/task-list/TaskList';
import { PageWrapper, Title } from './components/page-wrapper/Page-wrapper';
import Search from './components/search/Search';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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
        time: time
      });

      const updateTimestamp = await updateDoc(task, {
        timestamp: serverTimestamp()
      });
    }
    getAllDocument().then(setTasks);
  }

  const taskRemove = (id) => {
    getDeletedDocument(id).then(setTasks(tasks.filter((task) => task.id !== id)));
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
        taskRemove={taskRemove}
        setTasks={setTasks}
        tasks={tasks}
      />
    </PageWrapper>
  );
}

export default App;
