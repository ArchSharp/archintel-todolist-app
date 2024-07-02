import { useState } from "react";
import ToDoItem from "./ToDoItem";
import { AiFillPlusSquare } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

export const TodoContainer = ({
  groupIndex,
  group,
  deleteTodo,
  handleEdit,
  isCompletedTodo,
  modifyTodoGroup,
}) => {
  const [showTodos, setShowTodos] = useState(false);

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
        <h4
          style={{
            // color: "white",
            fontSize: "20px",
            padding: "10px 0px 10px 7px",
          }}
        >
          {group.todogroupname}
        </h4>
        <AiFillPlusSquare
          style={{
            color: "white",
            margin: "0px 10px 0px auto",
            fontSize: "30px",
          }}
          onClick={() => modifyTodoGroup(group.todogroupname)}
        />
        <MdDeleteForever
          //   className="todo-del-icon"
          style={{
            color: "red",
            margin: "0px 10px 0px 5px",
            fontSize: "30px",
          }}
          //   onClick={() => deleteFn(index)}
        />
        <IoIosArrowForward
          style={{
            color: "white",
            margin: "0px 10px 0px 5px",
            fontSize: "30px",
          }}
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
