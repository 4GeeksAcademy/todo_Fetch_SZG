import React from "react";

//include images into your bundle

//create your first component
import TodoList from "./TodoList";
const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-center mt-5">TODO LIST</h1>
      <TodoList />
      <div className="footer">Todo List Challenge 2025 &copy;</div>
    </div>
  );
};

export default Home;
