import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const [todoRef, setTodoRef] = useState("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );
  const [editItem, setEditItem] = useState({})
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
    
    const newItem = {
      id: editItem ? editItem.id : id++,
      name: todoRef,
      isCompleted: editItem ? editItem.isCompleted : false,
      date: editItem ? editItem.date : new Date().toDateString(),
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

  const handleEdit = (editItemIndex) => {
    let allTodoLists = todoLists.filter(
      (e, index) => index === editItemIndex
    )[0];
    setTodoRef(allTodoLists.name);
    setEditItem(allTodoLists);
    let delAllTodoLists = todoLists.filter((e, index) => index !== editItemIndex);
    setTodoLists(delAllTodoLists);
    localStorage.setItem("todolists", JSON.stringify(delAllTodoLists));
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
          .sort((a, b) => {
            return a.isCompleted - b.isCompleted;
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
