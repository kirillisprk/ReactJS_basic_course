import React, {useEffect, useRef, useState} from 'react';
import './SendMessage.scss'
import Button from '@mui/material/Button';
import {Send} from "@mui/icons-material";
import {TextField} from "@mui/material";
import {v4 as uuidv4} from "uuid";
import {selectProfileName} from "../../store/profile/selectors";
import {useSelector} from "react-redux";

export const SendMessage = ({onSendMessage}) => {
    const [textMessage, setTextMessage] = useState('');
    const userName = useSelector(selectProfileName);
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
            author: userName,
            text: textMessage,
            id: uuidv4()
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
