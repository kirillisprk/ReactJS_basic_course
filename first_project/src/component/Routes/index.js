import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {AppBar, Toolbar, Typography} from "@mui/material";
import {PublicRoute} from "../PublicRoute";
import {Home} from "../Home";
import {Article} from "../Article";
import {PrivateRoute} from "../PrivateRoute";
import Chats from "../Chats";
import {Profile} from "../Profile";
import {SignUp} from "../SignUp";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../services/firebase";
import {signIn, signOut} from "../../store/Home/actions";
import {initProfile} from "../../store/profile/actions";
import {selectAuth} from "../../store/Home/selectors";
import './style.scss'

export const Router = () => {
    const dispatch = useDispatch();
    const checkAuth = useSelector(selectAuth);
    useEffect(() => {
        dispatch(initProfile());
    }, []);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(signIn())
            } else {
                dispatch(signOut())
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    {!checkAuth && <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <Link className="link-color" to="/">Войти</Link>
                    </Typography>}
                    {checkAuth && <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <Link className="link-color" to="/chats">Chats</Link>
                    </Typography>}
                    <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <Link className="link-color" to="/article">Article</Link>
                    </Typography>
                    {checkAuth && <Typography variant="h6" component="div" sx={{mr: 2}}>
                        <Link className="link-color" to="/profile">Profile</Link>
                    </Typography>}
                    {!checkAuth && <Typography variant="h6" component="div">
                        <Link className="link-color" to="/signup">Регистрация</Link>
                    </Typography>}
                </Toolbar>
            </AppBar>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Home/>
                        </PublicRoute>
                    }/>
                <Route path="article" element={<Article/>}/>
                <Route path="chats">
                    <Route index element={
                        <PrivateRoute>
                            <Chats/>
                        </PrivateRoute>}/>
                    <Route path=":chatId" element={<Chats/>}/>
                </Route>
                <Route path="profile" element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>
                }/>
                <Route
                    path="signup"
                    element={
                        <PublicRoute>
                            <SignUp/>
                        </PublicRoute>
                    }/>
                <Route path="*" element={<h3>404</h3>}/>
            </Routes>
        </BrowserRouter>
    )
}
