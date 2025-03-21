import React, { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([
        "Testing my app",
        "Hating my own code",
        "Prayin to god of coding",
    ]);
    console.log(todos.length);
    const [task, setTask] = useState("");

    //Add task to list function
    const addTask = (event) => {
        event.preventDefault();
        const newTask = [...todos];
        newTask.push(task);
        setTodos(newTask);
        setTask("");
    };

    //Remove task from list function
    const removeTask = (index) => {
        const deletedTask = [...todos];
        deletedTask.splice(index, 1);
        setTodos(deletedTask);
    };

    //HTML task template
    const taskList = todos.length === 0 ?
        <li className="list-group-item shadow-sm d-flex justify-content-center">
            <div class="alert alert-info mt-2" role="alert">
                There are no task to be done. You can add new tasks now!
            </div>

        </li>
        :
        todos.map((task, index) =>
            <li
                className="list-group-item shadow-sm d-flex justify-content-center"
                key={index}
            >
                <div className="row col-12">
                    <div className="col-1">{index + 1}</div>
                    <div className="col-10">{task}</div>
                    <div className="col-1">
                        <button
                            className="removeButton rounded-circle"
                            onClick={() => {
                                removeTask(index);
                            }}
                        >
                            x
                        </button>
                    </div>
                </div>
            </li>

        );

    //Task form
    return (
        <div className="container d-flex">
            <div className="card col-12">
                <form className="" onSubmit={addTask}>
                    <input
                        type="text"
                        className="form-control text-center"
                        placeholder="What needs to be done?"
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
                    />
                </form>
                <ul className="list-group list-group-flush">{taskList}</ul>
                <div className="taskFooter d-flex justify-content-start">
                    {todos.length} task left
                </div>
            </div>
        </div>
    );
};
export default TodoList;
