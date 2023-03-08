import React, { useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { CgRadioCheck } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";

const ToDoItem = ({ content, index, deleteFn }) => {
  const [check, setCheck] = useState(false);

  return (
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
        {content}
      </span>
      <MdDeleteForever
        className="todo-del-icon"
        onClick={() => deleteFn(index)}
      />
    </div>
  );
};

export default ToDoItem;
