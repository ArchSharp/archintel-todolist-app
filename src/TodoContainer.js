import { useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaAngleDoubleRight } from "react-icons/fa";

export const TodoContainer = ({
  groupIndex,
  group,
  deleteTodo,
  handleEdit,
  handleEditGroupTitle,
  isCompletedTodo,
  modifyTodoGroup,
}) => {
  const [todoLists, setTodoLists] = useState(
    JSON.parse(localStorage.getItem("todolists")) || []
  );
  const [showTodos, setShowTodos] = useState(false);
  const [isEditGroup, setIsEditGroup] = useState(false);
  const [newTitle, setNewTitle] = useState(todoLists[groupIndex].todogroupname);

  console.log("group.todogroupname: ", newTitle);

  return (
    <div className="todo-list-container" key={groupIndex}>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          height: "fit-content",
          //   justifyContent: "space-between",
        }}
      >
        {!isEditGroup ? (
          <h4
            style={{
              // color: "white",
              fontSize: "20px",
              padding: "5px 0px 5px 7px",
            }}
          >
            {newTitle}
          </h4>
        ) : (
          <input
            style={{
              margin: "4px 4px",
              padding: "4px 4px",
              height: "25px",
              width: "80%",
              fontSize: "14px",
            }}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
          />
        )}
        {!isEditGroup && (
          <AiFillPlusSquare
            className="add2-btn"
            onClick={() => modifyTodoGroup(group.todogroupname)}
          />
        )}
        {!isEditGroup && (
          <FaEdit
            className="edit-group-btn"
            onClick={() => {
              setIsEditGroup(!isEditGroup);
            }}
          />
        )}
        {!isEditGroup && (
          <MdDeleteForever
            className="delete-btn"
            //   onClick={() => deleteFn(index)}
          />
        )}
        {isEditGroup && (
          <FaAngleDoubleRight
            className="edit-group-btn"
            onClick={() => {
              handleEditGroupTitle(groupIndex, newTitle);
              setIsEditGroup(!isEditGroup);
            }}
            style={{ marginLeft: `${isEditGroup && "auto"}` }}
          />
        )}
        <IoIosArrowForward
          style={{ marginRight: `5px` }}
          className={`collapse-todo ${
            showTodos ? "open-user-arrow" : "close-user-arrow"
          }`}
          onClick={() => setShowTodos(!showTodos)}
        />
      </div>
      {showTodos && (
        <div>
          {group.todolists
            ?.sort((a, b) => {
              return b.id - a.id;
            })
            .sort((a, b) => {
              return a.isCompleted - b.isCompleted;
            })
            .map((content, todoIndex) => (
              <li className="todo-item" key={todoIndex}>
                <ToDoItem
                  content={content}
                  index={todoIndex}
                  deleteFn={() => deleteTodo(groupIndex, todoIndex)}
                  editFn={() => handleEdit(groupIndex, todoIndex)}
                  isCompletedFn={(check) =>
                    isCompletedTodo(check, groupIndex, todoIndex)
                  }
                />
              </li>
            ))}
        </div>
      )}
    </div>
  );
};
