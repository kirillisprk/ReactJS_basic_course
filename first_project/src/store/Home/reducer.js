import {SIGN_IN, SIGN_OUT} from "./actions";

const initialState = {
    authed: false
}

export const homeReducer = (state = initialState, {type}) => {
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                authed: true
            };
        case SIGN_OUT:
            return {
                ...state,
                authed: false
            };
        default:
            return state
    }
}
