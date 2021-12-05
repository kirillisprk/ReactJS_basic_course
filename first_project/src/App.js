import React from "react";
import {CircularProgress} from "@mui/material";
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {Router} from "./component/Routes";

export const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<CircularProgress/>}>
                <Router/>
            </PersistGate>
        </Provider>
    )
}


