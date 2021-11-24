import {v4 as uuidv4} from "uuid";

export const ADD_MESSAGE = "CHAT::ADD_MESSAGE";
export const DELETE_MESSAGE = "CHAT::DELETE_MESSAGE";

export const addMessage = (chatId, newMessage) => ({
    type: ADD_MESSAGE,
    payload: {chatId, newMessage},
});
export const deleteMessage = (chatId, messageId) => ({
    type: DELETE_MESSAGE,
    payload: {chatId, messageId},
});
let timer;
export const addMessageWithReply = (chatId, message) => (dispatch) =>{
    if(timer){
        clearTimeout(timer);
    }
    dispatch(addMessage(chatId, message));
    if (message.author !=='Bot') {
        timer = setTimeout(() => {
            const newMessage = {
                author: 'Bot',
                text: 'OK',
                id: uuidv4()
            }
            dispatch(addMessage(chatId,newMessage))
        }, 1000);
    }
}
