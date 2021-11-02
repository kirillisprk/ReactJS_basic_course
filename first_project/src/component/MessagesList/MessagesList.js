import React from 'react';
import './message.scss'

export const MessagesList = ({messageList}) => {
    return <div className="message-list">
        {messageList.map((message) => (
            <div
                className={message.author === 'User' ? 'message-in' : 'message-out'}>
                <div className="author-title">{message.author}</div>
                <div className="message-text">{message.text}</div>
            </div>
        ))}
    </div>
}

