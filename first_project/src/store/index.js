import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import {profileReducer} from "./profile/reducer";
import {chatsReducer} from "./Chats/reducer";
import {messagesReducer} from "./Messages/reducer";
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {articlesReducer} from "./Article/reducer";
import {homeReducer} from "./Home/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const config = {
    key: 'gbMsnger',
    storage,
    blacklist: ['article', 'profile', 'chats,', 'messages']
};
const per = persistReducer(config,
    combineReducers({
        chats: chatsReducer,
        messages: messagesReducer,
        profile: profileReducer,
        article: articlesReducer,
        home: homeReducer,
    }));
export const store = createStore(
    per,
    composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);


