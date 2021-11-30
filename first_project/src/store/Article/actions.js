import {apiUrl} from "../../component/Utils/Utils";

export const REQUEST_ARTICLE_LOADING = "ARTICLE::REQUEST_LOADING";
export const REQUEST_ARTICLE_FAIL = "ARTICLE::REQUEST_FAIL";
export const REQUEST_ARTICLE_SUCCESS = "ARTICLE::REQUEST_SUCCESS";

export const getArticleLoading = () => ({
    type: REQUEST_ARTICLE_LOADING
})
export const getArticleFail = (err) => ({
    type: REQUEST_ARTICLE_FAIL,
    payload: err
})
export const getArticleSuccess = (article) => ({
    type: REQUEST_ARTICLE_SUCCESS,
    payload: article
})

export const getArticle = () => async (dispatch) => {
    console.log("Запрашиваем статьи с", apiUrl);
    dispatch(getArticleLoading());
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        dispatch(getArticleSuccess(result));
    } catch (err) {
        console.warn(err)
        dispatch(getArticleFail(err.message));
    }

}
