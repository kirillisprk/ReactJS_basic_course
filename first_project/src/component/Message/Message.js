import React from 'react';
import './message.scss'

export const Message = ({name}) => {
    return (
        <div>
            <header className="App-header">
                My First React App
                <h3>Hello, <span className="name-style">{name}</span></h3>
            </header>
        </div>
    );
}

