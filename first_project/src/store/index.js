import {createStore, combineReducers} from 'redux';
import {profileReducer} from "./profile/reducer";
import {chatsReducer} from "./Chats/reducer";
import {messagesReducer} from "./Messages/reducer";

export const store = createStore(
    combineReducers({
        chats: chatsReducer,
        messages: messagesReducer,
        profile: profileReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());


