import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    "Testing my app",
    "Hating my own code",
    "Prayin to god of coding",
  ]);
  const [task, setTask] = useState("");

  const addTask = (event) => {
    event.preventDefault();
    const newTask = [...todos];
    newTask.push(task);
    setTodos(newTask);
  };
  const removeTask = (index) => {
    const deletedTask = [...todos];
    deletedTask.splice(index, 1);
    setTodos(deletedTask);
  };

  const taskList = todos.map((task, index) => (
    <li className="list-group-item" key={index}>
      {task}
      <button
        className="removeButton"
        onClick={() => {
          removeTask(index);
        }}
      >
        X
      </button>
    </li>
  ));

  return (
    <div className="container">
      <form className="form-control form-control-lg" onSubmit={addTask}>
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done?"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
      </form>
      <ul className="list-group list-group-flush">{taskList}</ul>
    </div>
  );
};
export default TodoList;
