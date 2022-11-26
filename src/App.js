
function App() {
  const tasks = [{
    id: 1,
    title: "placholder",
  },
  {
    id: 2,
    title: "sdsdsdsdsd",
  }];

  console.log(tasks);
  return (
    <article>
      <h1>To do app</h1>
      <form>
        <input type="text" />
        <button type="submit">добавить</button>
      </form>
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
