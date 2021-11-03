import './App.css';
import {MessagesList} from "./component/MessagesList/MessagesList";
import React, {useCallback, useEffect, useState} from "react";
import {SendMessage} from "./component/SendMessage/SendMessage";
import {ChatList} from "./component/ChatList/chatList";
import {v4 as uuidv4} from 'uuid';

function App () {
    const [messageList, setMessageList] = useState([]);
    const [chatList, setChatList] = useState([]);
    const handleSendMessage = useCallback((newMessage) => {
        setMessageList((oldArray) => [...oldArray, newMessage]);
    }, []);
    useEffect(() => {
        if (messageList.length && messageList[messageList.length - 1].author === 'User') {
            const timer = setTimeout(() => {
                const newMessage = {
                    author: 'Bot',
                    text: 'OK',
                    id: `$message-${Date.now()}`
                }
                setMessageList((oldArray) => [...oldArray, newMessage]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messageList]);
    useEffect(() => {
        const countChat = 4;
        for (let i = 1; i <= countChat; i++) {
            const newChat = {
                name: `Chat ${i}`,
                id: uuidv4()
            }
            setChatList((oldArray) => [...oldArray, newChat])
        }

    }, [])
    return (
        <div className="App">
            <div>
                <ChatList chatList={chatList}/>
            </div>
            <div className="show-current-chat">
                <MessagesList messageList={messageList}/>
                <SendMessage onSendMessage={handleSendMessage}/>
            </div>
        </div>
    );
}

export default App;
