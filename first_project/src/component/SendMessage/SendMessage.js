import React, {useState} from 'react';
import './SendMessage.scss'

export const SendMessage = ({onSendMessage}) => {
    const [textMessage, setTextMessage] = useState('');
    const handleChange = (event) => {
        setTextMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
            author: 'User',
            text: textMessage,
            id: `$message-${Date.now()}`
        };
        onSendMessage(newMessage);
        setTextMessage('')
    }

    return <form className="send-message-form" onSubmit={handleSubmit}>
        <input className="enter-text-input" placeholder="Enter message" type="text" value={textMessage}
               onChange={handleChange}/>
        <input className="send-button" disabled={!textMessage} type="submit"/>
    </form>
}
