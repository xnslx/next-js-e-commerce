import * as actionTypes from "../action/type";
import { intlState } from "./index";

const shoppingCartReducer = (state = intlState, action) => {
    switch (action.type) {
        case actionTypes.ADD_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: action.payload,
            };
        case actionTypes.GET_SHOPPING_CART:
            return {...state, shoppingCart: action.payload };
        case actionTypes.EMPTY_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: [],
            };
        default:
            return state;
    }
};

export default shoppingCartReducer;