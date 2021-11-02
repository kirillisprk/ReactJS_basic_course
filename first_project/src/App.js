import './App.css';
import {MessagesList} from "./component/MessagesList/MessagesList";
import React, {useCallback, useEffect, useState} from "react";
import {SendMessage} from "./component/SendMessage/SendMessage";

function App () {
    const [messageList, setMessageList] = useState([]);
    const handleSendMessage = useCallback((newMessage) => {
        setMessageList((oldArray) => [...oldArray, newMessage]);
    }, []);

    useEffect(() => {
        if (messageList.length && messageList[messageList.length - 1].author === 'User') {
            const timer = setTimeout(() => {
                const newMessage = {author: 'Bot', text: 'OK'}
                setMessageList((oldArray) => [...oldArray, newMessage]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messageList]);
    return (
        <div className="App">
            <MessagesList messageList={messageList}/>
            <SendMessage onSendMessage={handleSendMessage}/>
        </div>
    );
}

export default App;
