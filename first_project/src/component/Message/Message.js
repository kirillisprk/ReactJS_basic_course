import React from 'react';
import './message.scss'

export const Message = ({messageList}) => {
    return messageList.map((message) => {
            return <div>Текст:{message.text} Автор:{message.author}</div>
        }
    );
}

