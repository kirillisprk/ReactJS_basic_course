import {ADD_MESSAGE} from "./actions";

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
                    [payload.chatId]: [
                        ...currentMessage,
                        payload.newMessage
                    ]
                }
            };
        default:
            return state
    }
};
