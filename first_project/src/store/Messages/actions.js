import {v4 as uuidv4} from "uuid";
import {onValue, push} from "firebase/database";
import {getMessageListRefById, messagesRef} from "../../services/firebase";

export const ADD_MESSAGE = "MESSAGE::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGE:DELETE_MESSAGE";
export const SET_MESSAGE = "MESSAGE::SET_MESSAGE";

export const addMessage = (chatId, newMessage) => ({
    type: ADD_MESSAGE,
    payload: {chatId, newMessage},
});
export const deleteMessage = (chatId, messageId) => ({
    type: DELETE_MESSAGE,
    payload: {chatId, messageId},
});

export const setMessage = (newMessage) => ({
    type: SET_MESSAGE,
    payload: {newMessage},
});

let timer;
export const addMessageWithReply = (chatId, message) => (dispatch) => {
    if (timer) {
        clearTimeout(timer);
    }
    dispatch(addMessageWithWithFb(chatId, message));
    if (message.author !== 'Bot') {
        console.log("Робот должен ответить");
        timer = setTimeout(() => {
            const newMessage = {
                author: 'Bot',
                text: 'OK',
                id: uuidv4()
            }
            dispatch(addMessageWithWithFb(chatId, newMessage))
        }, 1000);
    }
}

export const initMessage = () => (dispatch) => {
    console.log("Получение списка сообщений из Firebase");
    console.time("Firebase get Messages");
    onValue(messagesRef, (snapshot) => {
        const newMessage = {};
        snapshot.forEach((snap) => {
            newMessage[snap.key] = Object.values(snap.val().messageList || {});
        });
        dispatch(setMessage(newMessage));
    });
    console.timeEnd("Firebase get Messages");
}

export const addMessageWithWithFb = (chatId, newMessage) => () => {
    console.log("Добавление сообщения в Firebase");
    console.time('Firebase create Message');
    push(getMessageListRefById(chatId), newMessage);
    console.timeEnd('Firebase create Message');

}

