/**
 * Created by igor on 19.02.17.
 */

import {applyMiddleware, createStore} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "./reducers";

export default (initialState) => {
    const middlewares = [
        promise(), thunk
    ];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger());
    }
    return applyMiddleware(...middlewares)(createStore)(reducer, initialState);
};
