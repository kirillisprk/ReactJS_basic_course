import React from "react";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";
import Chats from "./component/Chats";
import {Article} from "./component/Article";
import {AppBar, CircularProgress, Toolbar, Typography} from "@mui/material";
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {Profile} from "./component/Profile";

export const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<CircularProgress/>}>
            <BrowserRouter>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{mr: 2}}>
                            <Link to="/">Article</Link>
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mr: 2}}>
                            <Link to="/chats">Chats</Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                            <Link to="/profile">Profile</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Routes>
                    <Route path="/" element={<Article/>}/>
                    <Route path="chats">
                        <Route index element={<Chats/>}/>
                        <Route path=":chatId" element={<Chats/>}/>
                    </Route>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="*" element={<h3>404</h3>}/>
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>

)


