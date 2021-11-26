import {REQUEST_ARTICLE_FAIL, REQUEST_ARTICLE_LOADING, REQUEST_ARTICLE_SUCCESS} from "./actions";
import {STATUS} from "../../component/Utils/Utils";

const initialState = {
    articlesList: [],
    request: {
        status: STATUS.IDEL,
        error: ''
    }
}

export const articlesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case REQUEST_ARTICLE_LOADING:
            return {
                ...state,
                request: {
                    ...state.request,
                    status: STATUS.LOADING
                }
            };
        case REQUEST_ARTICLE_SUCCESS:
            return {
                ...state,
                articlesList: payload,
                request: {
                    error: '',
                    status: STATUS.SUCCESS
                }
            };
        case REQUEST_ARTICLE_FAIL:
            return {
                ...state,
                request: {
                    error: payload,
                    status: STATUS.ERROR
                }
            };
        default:
            return state
    }
}
