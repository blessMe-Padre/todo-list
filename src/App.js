import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const generateId = () => (Math.random().toString(16).slice(2) + new Date().getTime().toString(36));

  const taskAdd = (title) => {
    setTasks([
      ...tasks,
      {
        id: generateId(),
        title,
      }
    ]);
  }

  return (
    <article>
      <h1>Список дел</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          placeholder="введите задачу"
          onChange={(evt) => {
            setInputValue(evt.target.value);
          }}
        />
        <button
          onClick={() => {
            taskAdd(inputValue);
            setInputValue('')
          }}
        >
          добавить
        </button>
      </div>
      <section>
        <ul>
          {tasks.length <= 0 && (
            <p>Список задач пуст</p>
          )
          }

          {tasks.map((task) => {
            return (
              <li key={task.id}>{task.title}</li>
            )
          })
          }
        </ul>
      </section>
    </article>
  );
}

export default App;
