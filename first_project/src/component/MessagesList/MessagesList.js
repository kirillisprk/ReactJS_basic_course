import React, {useEffect, useRef} from 'react';
import './message.scss'

export const MessagesList = ({messageList}) => {
    const messageListRef = useRef(null);
    useEffect(() => {
            messageListRef.current?.scrollIntoView({
                behavior: "auto"
            });
        },
        [messageList]
    )
    return <div ref={messageListRef} className="message-list">
        {messageList.map((message) => (
            <div key={message.id}
                 className={message.author === 'User' ? 'message-in' : 'message-out'}>
                <div className="author-title">{message.author}</div>
                <div className="message-text">{message.text}</div>
            </div>
        ))}
    </div>
}

