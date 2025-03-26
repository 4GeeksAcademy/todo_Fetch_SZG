import React, { useEffect, useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        loadTodos();
    }, []);

    function loadTodos() {
        fetch('https://playground.4geeks.com/todo/users/szarraga')
            .then(resp => {
                if (!resp.ok) {
                    console.error(resp.statusText, resp.status)
                    return
                }
                return resp.json();
            })
            .then(dataJson => {
                setTodos(dataJson.todos);
            })
    }

    //Add task to list function
    const addTask = (event) => {
        event.preventDefault();
        const newTask = {
            label: task,
            is_done: false,
        };


        fetch('https://playground.4geeks.com/todo/todos/szarraga', {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    console.error(resp.statusText, resp.status)
                    return
                }
                return resp.json();
            })
            .then(() => {
                // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                loadTodos();
                setTask("");
            })
            .catch(error => {
                // Manejo de errores
                console.log(error);
            });
    };

    //remove to list function
    const removeTask = (taskToRemove) => {
        fetch(`https://playground.4geeks.com/todo/todos/` + taskToRemove, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    console.error(resp.statusText, resp.status)
                    return
                }
            })
            .then(() => {
                // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                const updatedTodos = todos.filter(todo => todo.id !== taskToRemove);
                setTodos(updatedTodos);
                loadTodos();
            })
            .catch(error => {
                // Manejo de errores
                console.log(error);
            });
    };


    //HTML task template
    const taskList = todos.length === 0 ?
        <li className="list-group-item shadow-sm d-flex justify-content-center">
            <div className="alert alert-info mt-2" role="alert">
                There are no task to be done. You can add new tasks now!
            </div>

        </li>
        :
        todos.map((todo, index) =>
            <li
                className="list-group-item shadow-sm d-flex justify-content-center"
                key={index}
            >
                <div className="row col-12">
                    <div className="col-1">{index + 1} - {todo.id}</div>
                    {todo.is_done ? <div className="col-10  text-decoration-line-through" > {todo.label} </div> : <div className="col-10">{todo.label} </div>}
                    <div className="col-1">
                        <button
                            className="removeButton rounded-circle"
                            onClick={() => {
                                removeTask(todo.id);
                            }}
                        >
                            x
                        </button>
                    </div>
                </div>
            </li >

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
