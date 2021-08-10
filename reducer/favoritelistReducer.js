import * as actionTypes from "../action/type";
import { intlState } from "./index";

const favoriteListReducer = (state = intlState, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: {
                    favIds: action.payload.favIds.map((i) => i.prodId),
                    items: action.payload.favItems,
                },
            };
        case actionTypes.GET_PRODUCT_FAVORITE_LIST:
            return {
                ...state,
                favoriteList: {
                    favIds: action.payload.favIds,
                    items: action.payload.favItems,
                },
            };
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