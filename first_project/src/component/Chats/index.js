import './Chats.css';
import {MessagesList} from "../MessagesList/MessagesList";
import React, {useCallback, useEffect} from "react";
import {SendMessage} from "../SendMessage/SendMessage";
import {ChatList} from "../ChatList/chatList";
import {Navigate, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {addChat, deleteChat} from "../../store/Chats/actions";
import {addMessage} from "../../store/Messages/actions";
import {selectChats} from "../../store/Chats/selectors";
import {selectMessageList} from "../../store/Messages/selectors";

function Chats () {
    const {chatId} = useParams();
    const dispatch = useDispatch();
    const chatList = useSelector(selectChats);
    const messages = useSelector(selectMessageList);
    const handleAddChat = useCallback((nameChat) => {
        const newIDChat = uuidv4();
        dispatch(addChat({name: nameChat, id: newIDChat}));

    }, [dispatch]);
    const handleDeleteChat = useCallback((idToDeleteChat) => {
        dispatch(deleteChat(idToDeleteChat));
    }, [dispatch]);
    const handleSendMessage = useCallback((newMessage) => {
        dispatch(addMessage(chatId, newMessage));
    }, [dispatch, chatId]);
    useEffect(() => {
        if (
            messages[chatId]?.length &&
            messages[chatId][messages[chatId].length - 1].author === 'User') {
            const timer = setTimeout(() => {
                const newMessage = {
                    author: 'Bot',
                    text: 'OK',
                    id: uuidv4()
                }
                handleSendMessage(newMessage)
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messages]);

    const getIdsChatList = () => {
        return chatList.map(element => element.id)
    }
    useEffect(() => {
        getIdsChatList();
    }, [chatList])

    if (chatId && !(getIdsChatList().includes(chatId))) {
        console.log('replace URL',)
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
