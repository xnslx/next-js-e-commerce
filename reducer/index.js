import { useMemo } from "react";
import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import favoriteListReducer from "./favoritelistReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

let store;

export const intlState = {
  favoriteList: [],
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favoriteList"],
};

const rootReducer = combineReducers({
  favoriteList: favoriteListReducer,
  error: errorReducer,
  auth: authReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (initialState = intlState) => {
  return createStore(
    persistedReducer,
    intlState,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState);
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }
  if (typeof window === "undefined") return _store;
  if (!store) store = _store;
  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
