import { create } from "zustand";

const useStore = create((set) => ({
  access: false,
  apiUrl: '',
  activeChat: '',
  contacts: [],
  instanceId: '',
  apiToken: '',      
  chatId: '',
  message: '',
  chatHistory: [],

  setAccess: (access) => set({ access }),
  setApiUrl: (apiUrl) => set({ apiUrl }),
  setActiveChat: (activeChat) => set({ activeChat }),
  setContacts: (contact) => set((store) => ({ contacts: [...store.contacts, contact] })),
  setInstanceId: (instanceId) => set({ instanceId }),
  setApiToken: (apiToken) => set({ apiToken }),
  setChatId: (chatId) => set({ chatId }),
  setMessage: (message) => set({ message }),
  setChatHistory: (chatHistory) => set((store) => ({ chatHistory: [...store.chatHistory, chatHistory] })),
  setNewMessage: (message, contact) => set((store) => {
    const findedChat = store.chatHistory.find((item) => item[contact]);

    if (!findedChat) return store;

    const updatedChat = [...findedChat[contact], message];

    const updatedChatHistory = store.chatHistory.map((item) => {
      if (item[contact]) {
        return {
          ...item,
          [contact]: updatedChat,
        };
      }
      return item;
    });

    return { chatHistory: updatedChatHistory };
  }),
}));

export default useStore
