import React from "react";
import "./style.css";
import { Contact } from "../contact/Contact";
import { AddContact } from "../addContact/AddContact";
import  useStore  from "../../store/store";
import { GreenApi } from "../greenApi/GreenApi";

export const ContactSidebar = ({ children }) => {
  const {contacts} = useStore()
  return (
    <div className="ContactSidebar">
      <AddContact/>
      {contacts.map((contact) => (
        <Contact key={contact} contactNumber={contact} />
      ))}
       {children}
       <GreenApi/>
    </div>
  );
};
