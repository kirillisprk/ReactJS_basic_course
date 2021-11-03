import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from "@mui/material";
import './chat-list.scss'

export const ChatList = ({chatList}) => {
    return <List className="chat-list">
        {chatList.map((chat) => (
            <ListItem key={chat.id}>
                <ListItemButton>
                    <ListItemText primary={chat.name}/>
                </ListItemButton>
            </ListItem>
        ))}
    </List>

}
