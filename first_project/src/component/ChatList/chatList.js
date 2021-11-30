import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {IconButton, ListItemButton, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Delete} from "@mui/icons-material";
import './chat-list.scss'

export const ChatList = ({chatList, onAddChat, onDelete}) => {
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddChat(value);
        setValue('');
    }
    return <List className="chat-list">
        <form className="chat-add-form" onSubmit={handleSubmit}>
            <TextField
                label="Enter Chat List"
                fullWidth
                variant="filled"
                value={value}
                onChange={handleChange}
                size="small"
                autoComplete="off"
            />
            <Button disabled={!value} variant="contained" type="submit">
                Add
            </Button>
        </form>
        {chatList.map((chat) => (
            <NavLink style={({isActive}) => ({color: isActive ? "red" : "blue"})} to={`/chats/${chat.id}`}
                     key={chat.id}>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary={chat.name}/>
                    </ListItemButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(chat.id)}>
                        <Delete/>
                    </IconButton>
                </ListItem>
            </NavLink>
        ))}
    </List>

}
