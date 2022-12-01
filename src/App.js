import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, query, where } from 'firebase/firestore';

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


  // const generateId = () => (Math.random().toString(16).slice(2) + new Date().getTime().toString(36));
  const time = new Date().toLocaleString();


  const getMultipleDocument = async function () {
    const q = query(collection(db, "Tasks"), where("Tasks", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }



  const getAllDocument = async function () {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    const taskList = querySnapshot.docs.map(doc => doc.data());

    return taskList;
  }
  useEffect(() => {
    getAllDocument().then(setTasks);
  }, [])


  const taskAdd = async (title) => {
    if (inputValue) {
      const task = doc(collection(db, "Tasks"));
      await setDoc(task, {
        id: task.id,
        title: title,
        completed: false,
        time: time
      });
      console.log("Document written with ID: ", task.id);
    }
    getAllDocument().then(setTasks);
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
