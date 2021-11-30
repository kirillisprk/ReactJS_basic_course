import {SET_CHAT, DELETE_CHAT} from "./actions";

const initialChats = [];
export const chatsReducer = (state = initialChats, {type, payload}) => {
    switch (type) {

        case DELETE_CHAT:
            return state.filter(({id}) => id !== payload);

        case SET_CHAT:
            return payload;

        default:
            return state
    }
};


