export const getApiEndpoints = (apiUrl, instanceId, apiToken) => ({
  SEND_MESSAGE: `${apiUrl}/waInstance${instanceId}/sendMessage/${apiToken}`,
  CHECK_WHATSAPP: `${apiUrl}/waInstance${instanceId}/checkWhatsapp/${apiToken}`,
  GET_CHAT_HISTORY: `${apiUrl}/waInstance${instanceId}/getChatHistory/${apiToken}`,
  RECEIVE_NOTIFICATION: `${apiUrl}/waInstance${instanceId}/receiveNotification/${apiToken}?receiveTimeout=2`,
  DELETE_NOTIFICATION: `${apiUrl}/waInstance${instanceId}/deleteNotification/${apiToken}`,
  GET_STATE_INSTANCE: `${apiUrl}/waInstance${instanceId}/getStateInstance/${apiToken}`,
});
