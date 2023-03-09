import React, { useRef, useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { CgRadioCheck } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";

const ToDoItem = ({ content, index, deleteFn }) => {
  const { name, date } = content;
  const [check, setCheck] = useState(false);
  const maxTextLength = useRef(35);

  return (
    <div className="each-todo-container">
      <div className="each-todo">
        <span onClick={() => setCheck(!check)} className="checkIcon">
          {check ? (
            <AiFillCheckCircle className="todo-check-icon" />
          ) : (
            <CgRadioCheck className="todo-check-icon" />
          )}
        </span>
        <span
          className="todo-content"
          style={{
            textDecorationLine: check ? "line-through" : "",
            // textDecorationStyle: check ? "double" : "",
          }}
        >
          {name.length > maxTextLength.current
            ? name.substring(0, maxTextLength.current) + "..."
            : name}
        </span>
        <MdDeleteForever
          className="todo-del-icon"
          onClick={() => deleteFn(index)}
        />
      </div>
      {/* <br /> */}
      <span style={{ marginLeft: "20px", marginTop: "10px" }}>{date}</span>
    </div>
  );
};

export default ToDoItem;
