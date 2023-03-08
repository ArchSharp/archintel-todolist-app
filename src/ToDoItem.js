import React, { useState } from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import { CgRadioCheck } from "react-icons/cg";

const ToDoItem = ({ content }) => {
  const [check, setCheck] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgb(11,11,69)",
        color: "lightgray",
        padding: "15px 10px",
        borderBottom: "1px solid gray",
      }}
    >
      <span onClick={() => setCheck(!check)} className="checkIcon">
        {check ? (
          <AiFillCheckCircle style={{ color: "lightGray", fontSize: "20px" }} />
        ) : (
          <CgRadioCheck style={{ color: "lightgray", fontSize: "20px" }} />
        )}
      </span>
      <span
        style={{
          marginLeft: "15px",
          textDecorationLine: check ? "line-through" : "",
          textDecorationStyle: check ? "double" : "",
        }}
      >
        {content}
      </span>
    </div>
  );
};

export default ToDoItem;
