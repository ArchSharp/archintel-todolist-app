import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const [todoRef, setTodoRef] = useState("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );
  let id = JSON.parse(localStorage.getItem("todolists"))?.length || 0;

  // console.log(todoLists);
  const isCompletedTodo = (check, cIndex) => {
    let allTodoLists = todoLists.filter((e, index) => index === cIndex)[0];
    let delAllTodoLists = todoLists.filter((e, index) => index !== cIndex);

    allTodoLists = { ...allTodoLists, isCompleted: check };
    allTodoLists = [allTodoLists, ...delAllTodoLists];
    setTodoLists(allTodoLists);
    localStorage.setItem("todolists", JSON.stringify(allTodoLists));
  };

  const deleteTodo = (delIndex) => {
    let allTodoLists = todoLists.filter((e, index) => index !== delIndex);
    setTodoLists(allTodoLists);
    localStorage.setItem("todolists", JSON.stringify(allTodoLists));
  };

  // console.log("outside todolists: ", todoLists.current);

  const addTodo = () => {
    console.log("outside todolists: ", id);
    const newItem = {
      id: id++,
      name: todoRef,
      isCompleted: false,
      date: new Date().toDateString(),
    };
    const updatedItems = [...todoLists, newItem];
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
        {todoLists
          ?.sort((a, b) => {
            return b.id - a.id;
          })
          .map((content, index) => {
            return (
              <li className="todo-item" key={index}>
                <ToDoItem
                  content={content}
                  index={index}
                  deleteFn={deleteTodo}
                  editFn={handleEdit}
                  isCompletedFn={isCompletedTodo}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TodoApp;
