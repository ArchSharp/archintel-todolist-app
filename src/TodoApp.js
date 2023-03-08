import React, { useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const todoRef = useRef("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );

  const addTodo = () => {
    const newItem = todoRef.current.value;
    const updatedItems = [newItem, ...todoLists];
    setTodoLists(updatedItems);
    localStorage.setItem("todolists", JSON.stringify(updatedItems));
    todoRef.current.value = "";
  };
  return (
    <div
      style={{
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid",
        fontFamily: "Montserrat",
        marginTop: "20px",
        borderRadius: "5px",
        backgroundColor: "lightcoral",
      }}
    >
      <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
        <span style={{ color: "navy" }}>ArchIntel </span>
        <span style={{ color: "white" }}>ToDo App</span>
      </h3>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Create a new todo"
          ref={todoRef}
          style={{
            width: "88%",
            height: "40px",
            paddingLeft: "10px",
            marginBottom: "50px",
            backgroundColor: "rgb(11,11,69)",
            borderRadius: "5px",
            color: "lightgray",
            fontSize: "16px",
          }}
        />
        <AiFillPlusSquare className="add-btn" onClick={addTodo} />
      </div>
      <ul className="todo-list">
        {todoLists.map((content, index) => {
          return (
            <li className="todo-item" key={index}>
              <ToDoItem content={content} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
