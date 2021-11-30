import React, {useCallback, useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import './Chats.css';
import {MessagesList} from "../MessagesList/MessagesList";
import {SendMessage} from "../SendMessage/SendMessage";
import {ChatList} from "../ChatList/chatList";
import {addChatWithFb, deleteChatWithFb, initialChatsT} from "../../store/Chats/actions";
import {addMessageWithReply, initMessage} from "../../store/Messages/actions";
import {selectChats} from "../../store/Chats/selectors";
import {selectMessageList} from "../../store/Messages/selectors";

function Chats () {
    const {chatId} = useParams();
    const dispatch = useDispatch();
    const chatList = useSelector(selectChats);
    const messages = useSelector(selectMessageList);

    //Добавление чатов
    const handleAddChat = useCallback((nameChat) => {
        const newIDChat = uuidv4();
        dispatch(addChatWithFb({id: newIDChat, name: nameChat}));
    }, [dispatch]);

    //Удаление чатов
    const handleDeleteChat = useCallback((idToDeleteChat) => {
        dispatch(deleteChatWithFb(idToDeleteChat));
    }, [dispatch]);

    //Отправка сообщений
    const handleSendMessage = useCallback((newMessage) => {
        console.log('сообщение', newMessage)
        dispatch(addMessageWithReply(chatId, newMessage));
    }, [dispatch, chatId]);

    //получения чатов и сообщений из Firebase
    useEffect(() => {
        console.log('useEffect Chats, для получения чатов и сообщений из Firebase');
        dispatch(initialChatsT());
        dispatch(initMessage());
    }, []);

    //проверка что нужный chatId существует и его можно отобразить
    if (chatId && !(messages[chatId])) {
        console.log('replace URL chats');
        return <Navigate replace to="/chats"/>
    }

    return (
        <div className="App">
            <div>
                <ChatList onDelete={handleDeleteChat} onAddChat={handleAddChat} chatList={chatList}/>
            </div>
            {chatId && <div className="show-current-chat">
                <MessagesList messageList={messages[chatId]}/>
                <SendMessage onSendMessage={handleSendMessage}/>
            </div>}
        </div>
    );

}

export default Chats;
