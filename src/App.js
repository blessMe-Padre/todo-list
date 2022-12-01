import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';


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


  const generateId = () => (Math.random().toString(16).slice(2) + new Date().getTime().toString(36));
  const time = new Date().toLocaleString();

  useEffect(() => {
    async function getTasks(db) {
      const tasksCol = collection(db, 'Tasks');
      const taskSnapshot = await getDocs(tasksCol);
      const taskList = taskSnapshot.docs.map(doc => doc.data());
      return setTasks(taskList);
    }
    getTasks(db);
  }, [])

  const taskAdd = async (title) => {
    if (inputValue) {
      //сначала добавляет таску в state...
      setTasks([
        {
          id: generateId(),
          title,
          completed: false,
          time: time
        },
        ...tasks,
      ]);
      //... и уже потом отправляет в БД

      const newTask = doc(collection(db, "Tasks"));
      await setDoc(newTask, {
        id: generateId(),
        title: title,
        completed: false,
        time: time
      });
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

      {/* <Search
        setTasks={setTasks}
        search={search}
        setSearch={setSearch}
      /> */}
      <TaskList
        // search={search}
        taskRemove={taskRemove}
        setTasks={setTasks}
        tasks={tasks}
      />
    </PageWrapper>
  );
}

export default App;
