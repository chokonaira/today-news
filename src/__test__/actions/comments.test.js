import * as uuid from "uuid";
import {
  addComment,
} from "../../redux/actions/comments";
import {
  COMMENTS_LOADING,
  ADD_COMMENTS_SUCCESS,
  COMMENTS_ERROR,
} from "../../redux/actions/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import firebase from "firebase";
import {Controllers} from "../../helpers/controllers"

const mockStore = configureStore([thunk]);

jest.mock("uuid");
jest.spyOn(uuid, "v4").mockReturnValue("1234");

const firestoreMock = {
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  set: jest.fn().mockResolvedValueOnce(),
  get: jest.fn().mockReturnThis(),
};

jest.spyOn(firebase, "firestore").mockImplementation(() => firestoreMock);

describe("Articles Comments", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("succesfully adds article comments to firestore", async (done) => {
  const store = mockStore({});
  const commentedArticle = {
    id: "1234",
    comment: 'Hello World ',
    articleUrl: 'url.com',
  };
    const expectedActions = [
      {
        type: COMMENTS_LOADING,
      },
      {
        type: ADD_COMMENTS_SUCCESS,
        payload: commentedArticle,
      },
    ];
    store.dispatch(addComment(commentedArticle.comment, commentedArticle.articleUrl)).then(() => {
      try {
        expect(firestoreMock.collection).toBeCalledWith("comments");
        expect(firestoreMock.doc).toBeCalledWith(commentedArticle.id);
        expect(firestoreMock.set).toBeCalledWith(commentedArticle);
        expect(store.getActions()).toEqual(expectedActions);

        done();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
