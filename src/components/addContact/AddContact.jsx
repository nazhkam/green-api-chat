import React from "react";
import "./style.css";
import useStore from "../../store/store";
import useApi from "../../services/useApi";

export const AddContact = () => {
  const [contact, setContact] = React.useState("");
  const { setContacts, contacts, access } = useStore();
  const { checkWhatsapp } = useApi();

  const handleAddContact = async () => {
    const check = contacts.includes(contact);
    if (contact.length !== 11) return alert("Номер должен состоять из 11 цифр");
    if(contact[0] !== "7") return alert("Номер должен начинаться с 7")
    if (check) return alert("Такой контакт уже есть");
    const contactExists = await checkWhatsapp(contact);
    if (!contactExists) return alert("Контакт не использует Ватсапп");
    setContacts(contact);
    setContact("");
  };

  return (
     access && (<div className="addContact">
      <input
        placeholder="Пример: 79999999999"
        type="number"
        className="addContactInput"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button className="addContactBtn" onClick={handleAddContact}>
        Добавить
      </button>
    </div>)
  );
};
