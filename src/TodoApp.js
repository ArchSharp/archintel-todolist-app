import React, { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";

const TodoApp = () => {
  const todoRef = useRef("");
  const [todoLists, setTodoLists] = useState(JSON.parse(localStorage.getItem("todolists"))||[]);
let id = JSON.parse(localStorage.getItem("todolists"))?.length||0
  // var todoLists = useRef(JSON.parse(localStorage.getItem("todolists")) || []);


  const deleteTodo = (delIndex) => {
  //   console.log(delIndex);
  let allTodoLists = todoLists.filter((e, index) => index !== delIndex);
    
  //   console.log(allTodoLists);
   setTodoLists(allTodoLists);
    localStorage.setItem("todolists", JSON.stringify(allTodoLists));
  //   console.log("After todolists: ", todoLists);
    // window.location.reload();
  };

  

  // useEffect(() => {
  //   // console.log("useEffect todolists: ", todoLists.current);
  //   setTodoLists(JSON.parse(localStorage.getItem("todolists")));
  // }, []);

  // console.log("outside todolists: ", todoLists.current);

  const addTodo = () => {
    const newItem = {id:id++, name:todoRef.current.value};
    const updatedItems = [newItem, ...todoLists];
    console.log(updatedItems)
    setTodoLists(updatedItems);
    localStorage.setItem("todolists", JSON.stringify(updatedItems));
    // todoRef.current.value = "";
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
        {todoLists?.map((content, index) => {
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
