import {
    getArticle, getArticleFail,
    getArticleLoading,
    getArticleSuccess,
    REQUEST_ARTICLE_LOADING,
    REQUEST_ARTICLE_SUCCESS
} from '../actions';
import {articlesReducer} from "../reducer";
import {STATUS} from "../../../component/Utils/Utils";

describe('actions Article', () => {
    it('should return obj article Loading', () => {
            const expected = {
                type: REQUEST_ARTICLE_LOADING
            };
            const receiver = getArticleLoading();
            expect(receiver).toEqual(expected)
        }
    );
    it('should return obj Article Success', () => {
        const payload = [{id: 123}, {id: 32}];
        const expected = {
            type: REQUEST_ARTICLE_SUCCESS,
            payload
        };

        const receiver = getArticleSuccess(payload);
        expect(receiver).toEqual(expected);
    });

});
describe('actions thunk article', () => {
    it('dispatch getArticleLoading', () => {
            const mockDispatch = jest.fn();

            getArticle()(mockDispatch);

            expect(mockDispatch).toHaveBeenCalledWith(getArticleLoading());
        }
    );
    it('dispatch action on successful fetch', async () => {
            const result = {"articles": []};
            fetch.mockResponseOnce(JSON.stringify(result));
            const mockDispatch = jest.fn();

            await getArticle()(mockDispatch);

            expect(mockDispatch).toHaveBeenLastCalledWith(getArticleSuccess(result));
        }
    );
    it('dispatch action on failure fetch', async () => {
            const result = 'test';
            fetch.mockRejectOnce(new Error(result));
            const mockDispatch = jest.fn();

            await getArticle()(mockDispatch);

            expect(mockDispatch).toHaveBeenLastCalledWith(getArticleFail(result));
        }
    );

});
describe('reducer test', () => {
    it('SUCCESS response', () => {
        const payload = [{id: 123}, {id: 32}];
        const expected = {
            articlesList: payload,
            request: {
                error: '',
                status: STATUS.SUCCESS
            }
        };

        const receiver = articlesReducer(undefined, getArticleSuccess(payload));

        expect(receiver).toEqual(expected)
    });
    it('LOADING response', () => {
        const expected = {
            articlesList: [],
            request: {
                error: '',
                status: STATUS.LOADING
            }
        };

        const receiver = articlesReducer(undefined, getArticleLoading());

        expect(receiver).toEqual(expected)
    });
    it('ERROR response', () => {
        const textError = 'error message text';
        const expected = {
            articlesList: [],
            request: {
                error: textError,
                status: STATUS.ERROR
            }
        };

        const receiver = articlesReducer(undefined, getArticleFail(textError));

        expect(receiver).toEqual(expected)
    });
});


