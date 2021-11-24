import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {profileReducer} from "./profile/reducer";
import {chatsReducer} from "./Chats/reducer";
import {messagesReducer} from "./Messages/reducer";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: 'gbMsnger',
    storage,
};
const per = persistReducer(config,
    combineReducers({
        chats: chatsReducer,
        messages: messagesReducer,
        profile: profileReducer
    }));
export const store = createStore(
    per,
    composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);


