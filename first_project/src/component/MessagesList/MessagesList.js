import React, {useRef} from 'react';
import './message.scss'

export const MessagesList = ({messageList}) => {
    const messageListRef = useRef(null);
    if (messageList.length > 0) {
        return <div ref={messageListRef} className="message-list">
            {messageList.map((message) => (
                <div key={message.id}
                     className={message.author !== 'Bot' ? 'message-in' : 'message-out'}>
                    <div className="author-title">{message.author}</div>
                    <div className="message-text">{message.text}</div>
                </div>
            ))}
        </div>
    } else {
        return <>
            <div ref={messageListRef} className="message-list">
                <div className="empty-message">Добавьте сообщение</div>
            </div>
        </>
    }

}

