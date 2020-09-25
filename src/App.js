import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:6789/tasks")
  //     .then((response) => response.json())
  //     .then((data) => setTask(data));
  // }, []);

  useEffect(async () => {
    let response = await fetch("http://localhost:6789/tasks");
    let data = await response.json();
    setTask(data);
  }, []);
  return (
    <div>
      <ul>
        {task.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
