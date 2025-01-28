import { getApiEndpoints } from "./constants";
import { axiosInstance } from "./instance";
import useStore from "../store/store";

const useApi = () => {
  const { apiUrl, instanceId, apiToken } = useStore();
  const api = getApiEndpoints(apiUrl, instanceId, apiToken);

  const sendMessage = async (number, message) => {
    const { data } = await axiosInstance.post(api.SEND_MESSAGE, {
      chatId: `${number}@c.us`,
      message,
    });
    return data;
  };

  const checkWhatsapp = async (number) => {
    const { data } = await axiosInstance.post(api.CHECK_WHATSAPP, {
      phoneNumber: number,
    });
    return data?.existsWhatsapp;
  };

  const getChatHistory = async (number) => {
    const { data } = await axiosInstance.post(api.GET_CHAT_HISTORY, {
      chatId: `${number}@c.us`,
      count: 50,
    });

    const messages = data.map((item) => {
      let message = "";
      const type = item.type;
      const idMessage = item.idMessage;
      if (item.extendedTextMessage?.text) message = item.extendedTextMessage.text;
      else message = item.textMessage;
      return { idMessage, type, message };
    });
    return { [number]: messages.reverse() };
  };

  const receiveNotification = async () => {
    const { data } = await axiosInstance.get(api.RECEIVE_NOTIFICATION);
    return data;
  };

  const deleteNotification = async (receiptId) => {
    const { data } = await axiosInstance.delete(`${api.DELETE_NOTIFICATION}/${receiptId}`);
    return data;
  };

  const getStateInstance = async () => {
    const { data } = await axiosInstance.get(api.GET_STATE_INSTANCE);
    return data;
  };

  return {
    sendMessage,
    checkWhatsapp,
    getChatHistory,
    receiveNotification,
    deleteNotification,
    getStateInstance,
  };
};

export default useApi;
