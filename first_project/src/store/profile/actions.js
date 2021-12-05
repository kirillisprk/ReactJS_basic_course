import {onValue, set} from "firebase/database";
import {userRef} from "../../services/firebase";

export const TOGGLE_CHECKBOX = "PROFILE::TOGGLE_CHECKBOX";
export const SET_USER_NAME = "PROFILE::SET_USER_NAME"

export const setUserName = (nameUser) => ({
    type: SET_USER_NAME,
    payload: nameUser
})

export const initProfile = () => (dispatch) => {
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        console.log("Получение имени пользователя из Firebase", userData);
        dispatch(setUserName(userData || ''));
    })
};

export const editNameUser = (userName) => () => {
    console.log('Имя пользователя в Firebase изменено на:', userName)
    set(userRef, userName)

}
