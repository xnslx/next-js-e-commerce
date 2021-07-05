import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import favoriteListReducer from "./favoritelistReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    favoriteList: favoriteListReducer,
    error: errorReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;