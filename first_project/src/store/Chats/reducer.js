import {ADD_CHAT, DELETE_CHAT} from "./actions";

const initialChats = [];
export const chatsReducer = (state = initialChats, {type, payload}) => {
    switch (type) {
        case ADD_CHAT:
            return [...state, payload];

        case DELETE_CHAT:
            console.log('ddd')
            return state.filter(({id}) => id !== payload);

        default:
            return state
    }
};
