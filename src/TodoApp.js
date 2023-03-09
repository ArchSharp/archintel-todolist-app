import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const [todoRef, setTodoRef] = useState("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );
  let id = JSON.parse(localStorage.getItem("todolists"))?.length || 0;

  const deleteTodo = (delIndex) => {
    let allTodoLists = todoLists.filter((e, index) => index !== delIndex);
    setTodoLists(allTodoLists);
    localStorage.setItem("todolists", JSON.stringify(allTodoLists));
  };

  // console.log("outside todolists: ", todoLists.current);

  const addTodo = () => {
    const newItem = {
      id: id++,
      name: todoRef,
      date: new Date().toDateString(),
    };
    const updatedItems = [newItem, ...todoLists];
    console.log(updatedItems);
    setTodoLists(updatedItems);
    localStorage.setItem("todolists", JSON.stringify(updatedItems));
    setTodoRef("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTodoRef(e.target.value);
  };

  const handleEdit = (editItem) => {
    setTodoRef(editItem);
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
          value={todoRef}
          onChange={handleChange}
          className="todo-form-input"
        />
        <AiFillPlusSquare className="add-btn" onClick={addTodo} />
      </div>
      <ul className="todo-list">
        {todoLists?.map((content, index) => {
          return (
            <li className="todo-item" key={index}>
              <ToDoItem
                content={content}
                index={index}
                deleteFn={deleteTodo}
                editFn={handleEdit}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
