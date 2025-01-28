import { } from "../services/useApi";
import useApi from "../services/useApi";



export const fetchData = async (activeChat, chatHistory, setChatHistory,getChatHistory) => {
  try {
    if (chatHistory.find((item) => item[activeChat])) return;
    const response = await getChatHistory(activeChat);
    setChatHistory(response);
  } catch (error) {
    console.log(error);
  }
};


let isProcessing = false;
export const getMessage = async (chatHistory, setNewMessage, deleteNotification, receiveNotification) => {
  if (isProcessing) return;

  isProcessing = true;

  try {
    const receivedMessage = await receiveNotification();

    if (!receivedMessage) return;

    const message = receivedMessage?.body?.messageData?.textMessageData?.textMessage;
    const message2 = receivedMessage?.body?.messageData?.extendedTextMessageData?.text;
    const contact = (receivedMessage?.body?.senderData?.chatId).split("@")[0];
    const idMessage = receivedMessage?.body?.idMessage;
    const receiptId = receivedMessage?.receiptId;
    const type = (receivedMessage?.body?.typeWebhook).slice(0, 8);

    await deleteNotification(receiptId);

    const existingMessages = chatHistory.find((item) => item[contact]);

    if (
      existingMessages &&
      existingMessages[contact].some((item) => item.idMessage === idMessage)
    ) {
      return;
    }

    await setNewMessage({ idMessage, type, message: message || message2 }, contact);

  } catch (error) {
    console.log(error);
  } finally {
    isProcessing = false;
  }
};
