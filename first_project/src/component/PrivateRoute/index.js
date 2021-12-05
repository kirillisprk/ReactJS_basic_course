import React from "react";
import {useSelector} from "react-redux";
import {selectAuth} from "../../store/Home/selectors";
import {Navigate} from "react-router-dom";

export const PrivateRoute = ({children}) => {
    const checkAuth = useSelector(selectAuth);
    return checkAuth ? children : <Navigate to="/" replace/>
}
