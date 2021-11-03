import React, {useEffect, useRef, useState} from 'react';
import './SendMessage.scss'
import Button from '@mui/material/Button';
import {Send} from "@mui/icons-material";
import {TextField} from "@mui/material";

export const SendMessage = ({onSendMessage}) => {
    const [textMessage, setTextMessage] = useState('');
    const inputRef = useRef(null);
    const handleChange = (event) => {
        setTextMessage(event.target.value);
    }
    useEffect(() => {
        inputRef.current?.focus();
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = {
            author: 'User',
            text: textMessage,
            id: `$message-${Date.now()}`
        };
        onSendMessage(newMessage);
        setTextMessage('');
   
    }
    return <form className="send-message-form" onSubmit={handleSubmit}>
        <TextField
            id="outlined-multiline-flexible"
            className="style-multiline"
            label="Enter message"
            fullWidth
            multiline
            maxRows={4}
            variant="filled"
            value={textMessage}
            size="small"
            onChange={handleChange}
            inputRef={inputRef}
        />
        <Button variant="contained" disabled={!textMessage} type="submit" endIcon={<Send/>}>
            Send
        </Button>
    </form>
}
