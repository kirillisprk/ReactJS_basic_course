import './Chats.css';
import {MessagesList} from "../MessagesList/MessagesList";
import React, {useCallback, useEffect, useState} from "react";
import {SendMessage} from "../SendMessage/SendMessage";
import {ChatList} from "../ChatList/chatList";
import {Navigate, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";

function Chats () {
    const {chatId} = useParams();
    const [chatList, setChatList] = useState([]);
    const [historyMessage, setHistoryMessage] = useState({});
    const createChatList = (countChat) => {
        if (!chatList.length) {
            for (let i = 1; i <= countChat; i++) {
                const newChat = {
                    name: `Chat ${i}`,
                    id: uuidv4()
                }
                setChatList((oldArray) => [...oldArray, newChat])
            }
        }
    }
    const initialHistoryMessage = (chatList) => {
        if (chatList.length) {
            for (let i = 0; i < chatList.length; i++) {
                if (Object.keys(historyMessage).length === 0 ||
                    Object.keys(historyMessage).filter(key => historyMessage[key] === chatList[i].id)) {
                    setHistoryMessage((old) => ({...old, [chatList[i].id]: []}))
                }
            }
        }
    }
    const handleSendMessage = useCallback(
        (newMessage) => {
            setHistoryMessage((oldArray) => ({
                ...oldArray,
                [chatId]: [...oldArray[chatId], newMessage],
            }));
        },
        [chatId]);
    useEffect(() => {
        createChatList(4);
    }, [])
    useEffect(() => {
        initialHistoryMessage(chatList);
    }, [chatList])
    useEffect(() => {
        if (
            historyMessage[chatId]?.length &&
            historyMessage[chatId][historyMessage[chatId].length - 1].author === 'User') {
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
    }, [historyMessage]);

    if (chatId && !(chatId in historyMessage)) {
        return <Navigate replace to="/chats"/>
    }
    return (
        <div className="App">
            <div>
                <ChatList chatList={chatList}/>
            </div>
            {chatId && <div className="show-current-chat">
                <MessagesList messageList={historyMessage[chatId]}/>
                <SendMessage onSendMessage={handleSendMessage}/>
            </div>}
        </div>
    );

}

export default Chats;
