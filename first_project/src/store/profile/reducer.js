import {SET_USER_NAME, TOGGLE_CHECKBOX} from "./actions";

const initialState = {
    checkbox: false,
    name: ''
}
export const profileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                checkbox: !state.checkbox
            };
        case SET_USER_NAME:
            return {
                ...state,
                name: payload
            }
        default:
            return state;
    }
}
