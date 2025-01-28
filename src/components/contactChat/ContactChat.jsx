import React from "react";
import "./style.css";
import useStore from "../../store/store";
import { ChatMessage } from "../chatMessage/ChatMessage";
import { fetchData, getMessage } from "../../lib/utils";
import useApi from "../../services/useApi";

export const ContactChat = () => {
  const { sendMessage, getChatHistory, deleteNotification, receiveNotification } = useApi();
  const { activeChat, chatHistory, setChatHistory, setNewMessage, message,setMessage } = useStore();
  const chatRef = React.useRef(null);
  const send = () => {
    if (!message) return alert("Введите сообщение");
    sendMessage(activeChat, message);
    setMessage("");
  };

  React.useEffect(() => {
    if (!activeChat) return;

    fetchData(activeChat, chatHistory, setChatHistory,getChatHistory);

    const interval = setInterval(() => {
      getMessage(chatHistory, setNewMessage, deleteNotification, receiveNotification);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeChat, chatHistory]);

  const findedChat =
    chatHistory.find((item) => item[activeChat])?.[activeChat] || [];

  setTimeout(() => {
    if (chatHistory.length > 0) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, 5);

  return (
    <div className="contactChat">
      {activeChat && <div className="chatHeader"> CHAT with {activeChat}</div>}
      {chatHistory && (
        <div ref={chatRef} className="chatHistory">
          {findedChat.map((item, index) => (
            <ChatMessage key={index} message={item.message} type={item.type} />
          ))}
        </div>
      )}
      {activeChat && (
        <div className="sendMessage">
          <input
            placeholder="Message"
            className="sendMessageInput"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendMessageBtn" onClick={send}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};
