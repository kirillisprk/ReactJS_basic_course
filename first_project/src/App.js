import './App.css';
import {Message} from "./component/Message/Message";
import React, {useEffect, useState} from "react";

function App () {
    const [textMessage, setTextMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        let massage = {}
        massage.author = 'User';
        massage.text = textMessage;
        setMessageList(oldArray => [...oldArray, massage]);
        console.log('отправил');
        setTextMessage('')
    }
    const handleChange = (event) => {
        setTextMessage(event.target.value);
    }
    useEffect(() => {

    }, [messageList]);
    useEffect(() => {
        if (messageList.length > 0) {
            const timer = setTimeout(() => {
                if (messageList[messageList.length - 1].author === 'User') {
                    let massage = {}
                    massage.author = 'Bot';
                    massage.text = 'Ok';
                    setMessageList(oldArray => [...oldArray, massage]);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [messageList]);
    return (
        <div className="App">
            <Message messageList={messageList}/>
            <form onSubmit={handleSubmit}>
                <input type="text" value={textMessage} onChange={handleChange}/>
                <input disabled={!textMessage} type="submit"/>
            </form>
        </div>
    );
}

export default App;
