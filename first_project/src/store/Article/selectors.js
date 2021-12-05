import {STATUS} from "../../component/Utils/Utils";

export const selectArticleList = state => state.article.articlesList;
export const selectArticleLoading = state => state.article.request.status === STATUS.LOADING;
export const selectArticleError = state => state.article.request.error;
