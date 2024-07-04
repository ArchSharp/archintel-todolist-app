import React, { useEffect, useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { TodoContainer } from "./TodoContainer";

const TodoApp = () => {
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [todoRef, setTodoRef] = useState("");
  const [todoGroup, setTodoGroup] = useState("");
  const [existedGroup, setExistedGroup] = useState(false);
  const [todoDateRef, setTodoDateRef] = useState("");
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );
  const [editItem, setEditItem] = useState({});
  let id = JSON.parse(localStorage.getItem("todolists"))?.length || 0;

  const isCompletedTodo = (check, groupIndex, todoIndex) => {
    let updatedTodoLists = [...todoLists];
    let todoGroup = updatedTodoLists[groupIndex];
    todoGroup.todolists[todoIndex].isCompleted = check;
    setTodoLists(updatedTodoLists);
    localStorage.setItem("todolists", JSON.stringify(updatedTodoLists));
  };

  const deleteTodo = (groupIndex, todoIndex) => {
    let updatedTodoLists = [...todoLists];
    updatedTodoLists[groupIndex].todolists.splice(todoIndex, 1);
    if (updatedTodoLists[groupIndex].todolists.length === 0) {
      updatedTodoLists.splice(groupIndex, 1);
    }
    setTodoLists(updatedTodoLists);
    localStorage.setItem("todolists", JSON.stringify(updatedTodoLists));
  };

  const addTodo = (e) => {
    e.preventDefault();
    // console.log("adding todo: ");
    if (todoRef !== "" && todoDateRef !== "" && todoGroup !== "") {
      const newItem = {
        id: editItem.length > 0 ? editItem.id : id++,
        todo: todoRef,
        isCompleted: editItem.length > 0 ? editItem.isCompleted : false,
        date: editItem.length > 0 ? editItem.date : new Date(todoDateRef),
      };

      let updatedTodoLists = [...todoLists];
      let groupIndex = updatedTodoLists.findIndex(
        (group) => group.todogroupname === todoGroup
      );

      if (groupIndex !== -1) {
        updatedTodoLists[groupIndex].todolists.push(newItem);
      } else {
        updatedTodoLists.push({
          todogroupname: todoGroup,
          todolists: [newItem],
        });
      }

      setTodoLists(updatedTodoLists);
      localStorage.setItem("todolists", JSON.stringify(updatedTodoLists));
      setTodoRef("");
      setTodoGroup("");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setTodoRef(e.target.value);
  };

  const handleChangeGroup = (e) => {
    e.preventDefault();
    setTodoGroup(e.target.value);
  };

  const handleEdit = (groupIndex, todoIndex) => {
    let allTodoLists = todoLists[groupIndex];
    let editTodo = allTodoLists.todolists[todoIndex];
    setTodoRef(editTodo.todo);
    setTodoDateRef(editTodo.date);
    setTodoGroup(allTodoLists.todogroupname);
    setEditItem(editTodo);

    let updatedTodoLists = [...todoLists];
    updatedTodoLists[groupIndex].todolists.splice(todoIndex, 1);
    if (updatedTodoLists[groupIndex].todolists.length === 0) {
      updatedTodoLists.splice(groupIndex, 1);
    }
    setTodoLists(updatedTodoLists);
    localStorage.setItem("todolists", JSON.stringify(updatedTodoLists));
  };

  const handleEditGroupTitle = (groupIndex, newTitle) => {
    let updatedTodoLists = [...todoLists];
    // Update the group name at the specified index
    updatedTodoLists[groupIndex].todogroupname = newTitle;

    // Update the state with the new todoLists
    setTodoLists(updatedTodoLists);

    // Save the updated todoLists to localStorage
    localStorage.setItem("todolists", JSON.stringify(updatedTodoLists));
  };

  // console.log("first: ", todoGroup);

  const modifyTodoGroup = (todoGroup) => {
    setTodoGroup(todoGroup);
    setExistedGroup(true);
  };

  useEffect(() => {
    if (existedGroup === false) {
      if (todoGroup === "") setIsCreateGroup(false);
    } else if (existedGroup === true) {
      setIsCreateGroup(true);
    }
  }, [todoGroup, existedGroup]);

  return (
    <div
      className="todo-container"
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <div className="todo-head">
        <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
          <span style={{ color: "navy" }}>ArchIntel </span>
          <span style={{ color: "white" }}>ToDo App</span>
        </h3>

        {todoGroup && isCreateGroup ? (
          <>
            <div className="input-holder">
              <input
                type="text"
                placeholder="Enter todo item"
                value={todoRef}
                onChange={handleChange}
                className="todo-form-input"
              />
            </div>

            <div className="input-holder">
              <input
                type="datetime-local"
                id="date-time"
                name="date-time"
                value={todoDateRef}
                onChange={(e) => setTodoDateRef(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-holder">
              <input
                type="text"
                placeholder="Enter a name for todo group"
                value={todoGroup}
                onChange={handleChangeGroup}
                className="todo-form-input"
              />
            </div>
          </>
        )}

        <div className="todo-btns">
          {todoGroup && isCreateGroup ? (
            <button
              className="add-btn"
              onClick={(e) => {
                addTodo(e);
              }}
            >
              Create Todo
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={() => {
                setIsCreateGroup(!isCreateGroup);
              }}
            >
              New Todo group
            </button>
          )}
        </div>
      </div>
      <ul className="todo-list">
        {todoLists?.map((group, groupIndex) => (
          <TodoContainer
            key={groupIndex}
            groupIndex={groupIndex}
            group={group}
            deleteTodo={deleteTodo}
            handleEdit={handleEdit}
            handleEditGroupTitle={handleEditGroupTitle}
            isCompletedTodo={isCompletedTodo}
            modifyTodoGroup={modifyTodoGroup}
          />
        ))}
      </ul>
      <BsArrowDownCircleFill className="down-arrow" />
    </div>
  );
};

export default TodoApp;
