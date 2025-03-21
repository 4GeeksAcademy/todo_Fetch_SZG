import React from "react";

//include images into your bundle

//create your first component
import TodoList from "./TodoList";
const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Todo List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
