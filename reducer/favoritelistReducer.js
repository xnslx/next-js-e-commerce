import * as actionTypes from "../action/type";
import { intlState } from "./index";

const favoriteListReducer = (state = intlState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: action.payload,
            };
        case actionTypes.GET_PRODUCT_FAVORITE_LIST:
            return {...state, favoriteList: action.payload };
        case actionTypes.EMPTY_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: [],
            };
        default:
            return state;
    }
};

export default favoriteListReducer;