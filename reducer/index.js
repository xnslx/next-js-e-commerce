import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import favoriteListReducer from "./favoritelistReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

let initialState;

if (typeof window !== "undefined") {
    initialState = {
        favoriteList: {
            favoriteList: localStorage.getItem("favlist") ?
                JSON.parse(localStorage.getItem("favlist")) :
                [],
        },
    };
}

const rootReducer = combineReducers({
    favoriteList: favoriteListReducer,
    error: errorReducer,
    auth: authReducer,
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;