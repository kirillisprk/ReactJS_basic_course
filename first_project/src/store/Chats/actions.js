import {onValue, set, remove} from "firebase/database";
import {chatsRef, getChatRefById, getMessageRefById} from "../../services/firebase";

export const ADD_CHAT = "CHAT::ADD_CHAT"
export const SET_CHAT = "CHAT::SET_CHAT"
export const DELETE_CHAT = "CHAT::DELETE_CHAT"

export const addChat = (name) => ({
    type: ADD_CHAT,
    payload: name
});

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: id
});

export const setChat = (chats) => ({
    type: SET_CHAT,
    payload: chats
});

export const initialChatsT = () => (dispatch) => {
    console.log('Получение списка чатов из Firebase');
    console.time('Firebase get Chat');
    onValue(chatsRef, (snapshot) => {
        const newChats = [];
        snapshot.forEach((snap => {
            newChats.push(snap.val());
        }));
        dispatch(setChat(newChats));
    });
    console.timeEnd("Firebase get Chat");
};

export const addChatWithFb = (newChat) => () => {
    console.log('Создание чата в Firebase: ', newChat);
    console.time('Firebase create Chat');
    set(getMessageRefById(newChat.id), {empty: true});
    set(getChatRefById(newChat.id), newChat);
    console.timeEnd("Firebase create Chat");

}
export const deleteChatWithFb = (id) => () => {
    console.log('Удаление чата и его сообщений из Firebase ', id);
    console.time('Firebase delete Chat');
    remove(getChatRefById(id));
    remove(getMessageRefById(id));
    console.timeEnd("Firebase delete Chat");
}

