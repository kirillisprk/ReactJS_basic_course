import {ADD_MESSAGE, DELETE_MESSAGE, SET_MESSAGE} from "./actions";
import {DELETE_CHAT} from "../Chats/actions";

const initialMessage = {
    messageList: {}
};
export const messagesReducer = (state = initialMessage, {type, payload}) => {
    switch (type) {
        case ADD_MESSAGE:
            const currentMessage = state.messageList[payload.chatId] || []
            return {
                ...state,
                messageList: {
                    ...state.messageList,
                    [payload.chatId]: [...currentMessage, payload.newMessage]
                }
            };
        case DELETE_MESSAGE: {
            const newMessages = {...state};
            newMessages.messageList[payload.chatId] = newMessages.messageList[payload.chatId].filter(
                ({id}) => id !== payload.id);
            return newMessages
        }
        case DELETE_CHAT: {
            const newMessages = {...state};
            delete newMessages.messageList[payload];
            return newMessages;
        }

        case SET_MESSAGE: {
            return payload.newMessage;
        }

        default:
            return state
    }
};
