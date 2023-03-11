import React, { useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { CgRadioCheck } from "react-icons/cg";
import { MdDeleteForever, MdOutlineCalendarMonth } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ToDoItem = ({ content, index, deleteFn, editFn, isCompletedFn }) => {
  const { name, isCompleted, date } = content;
  const [fullText, setFullText] = useState(false);

  const handleIsComplete = () => {
    isCompletedFn(!Boolean(isCompleted), index);
  };

  return (
    <div className="each-todo-container">
      <div className="each-todo">
        <span onClick={handleIsComplete} className="checkIcon">
          {Boolean(isCompleted) ? (
            <AiFillCheckCircle className="todo-check-icon" />
          ) : (
            <CgRadioCheck className="todo-check-icon" />
          )}
        </span>
        <span
          className="todo-content"
          style={{
            textDecorationLine: Boolean(isCompleted) ? "line-through" : "",
            // textDecorationStyle: check ? "double" : "",
          }}
          onClick={() => setFullText(!fullText)}
        >
          {!fullText
            ? name.substring(0, 35) + (name.length > 35 ? "..." : "")
            : name.substring(0, name.length)}
        </span>
        <MdDeleteForever
          className="todo-del-icon"
          onClick={() => deleteFn(index)}
        />
      </div>
      <div
        style={{ marginLeft: "20px", marginTop: "10px", position: "relative" }}
      >
        <div className="todo-date" style={{ display: "flex" }}>
          <MdOutlineCalendarMonth style={{ marginTop: "2px" }} />
          <span
            style={{ marginLeft: "10px" }}
          >{`${date.toDateString()} ${date.toLocaleTimeString()}`}</span>
        </div>
        <FaEdit className="todo-edit-icon" onClick={() => editFn(index)} />
      </div>
    </div>
  );
};

export default ToDoItem;
