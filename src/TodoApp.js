import React, { useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const todoRef = useRef("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );

  const deleteTodo = (delIndex) => {
    const allTodoLists = todoLists;
    allTodoLists.splice(delIndex, 1);
    localStorage.setItem("todolists", JSON.stringify(allTodoLists));
    setTodoLists(allTodoLists);
    // console.log("todolists: ", todoLists, " c: ", allTodoLists);
  };

  const addTodo = () => {
    const newItem = todoRef.current.value;
    const updatedItems = [newItem, ...todoLists];
    setTodoLists(updatedItems);
    localStorage.setItem("todolists", JSON.stringify(updatedItems));
    todoRef.current.value = "";
  };

  return (
    <div className="todo-container">
      <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
        <span style={{ color: "navy" }}>ArchIntel </span>
        <span style={{ color: "white" }}>ToDo App</span>
      </h3>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Create a new todo"
          ref={todoRef}
          className="todo-form-input"
        />
        <AiFillPlusSquare className="add-btn" onClick={addTodo} />
      </div>
      <ul className="todo-list">
        {todoLists.map((content, index) => {
          return (
            <li className="todo-item" key={index}>
              <ToDoItem content={content} index={index} deleteFn={deleteTodo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
