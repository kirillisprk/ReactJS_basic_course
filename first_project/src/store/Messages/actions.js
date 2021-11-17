export const ADD_MESSAGE = "CHAT::ADD_MESSAGE"

export const addMessage = (chatId, newMessage) => ({
    type: ADD_MESSAGE,
    payload: {chatId: chatId, newMessage: newMessage},
});

