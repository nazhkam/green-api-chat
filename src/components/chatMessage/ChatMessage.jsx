import React from "react";
import "./style.css";

export const ChatMessage = ({ message, type }) => {
  return (
    <div className={`chatMessageContainer ${type}`}  >
      <div className='chatMessage'>{message}</div>
    </div>
  );
};
