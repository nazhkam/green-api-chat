import React from "react";
import "./style.css";
import useStore from "../../store/store";

export const Contact = ({ contactNumber }) => {
  const {setActiveChat} = useStore();
  const handleClick = () => {
    setActiveChat(contactNumber);
  };
  return (
    <div className="contact" onClick={handleClick}>
      {contactNumber}
    </div>
  );
};
