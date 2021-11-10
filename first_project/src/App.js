import React from "react";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import Chats from "./component/Chats";
import {Home} from "./component/Home";
import {AppBar, Toolbar, Typography} from "@mui/material";

export const App = () => (
    <BrowserRouter>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{mr: 2}}>
                    <Link to="/">Home</Link>
                </Typography>
                <Typography variant="h6" component="div">
                    <Link to="/chats">Chats</Link>
                </Typography>
            </Toolbar>
        </AppBar>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="chats">
                <Route index element={<Chats/>}/>
                <Route path=":chatId" element={<Chats/>}/>
            </Route>
            <Route path="*" element={<h3>404</h3>}/>
        </Routes>
    </BrowserRouter>
)


