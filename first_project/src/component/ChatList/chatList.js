import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {ListItemButton} from "@mui/material";
import './chat-list.scss'
import {NavLink} from "react-router-dom";
export const ChatList = ({chatList}) => {

    return <List className="chat-list">
        {chatList.map((chat) => (
            <NavLink style={({isActive}) => ({color: isActive ? "red" : "blue"})} to={`/chats/${chat.id}`}
                     key={chat.id}>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary={chat.name}/>
                    </ListItemButton>
                </ListItem>
            </NavLink>
        ))}
    </List>

}
