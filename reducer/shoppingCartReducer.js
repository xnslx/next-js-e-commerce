import * as actionTypes from "../action/type";
import { intlState } from "./index";

const shoppingCartReducer = (state = intlState, action) => {
    console.log("shoppingcartreducer", action);
    switch (action.type) {
        case actionTypes.ADD_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart,
            };
        case actionTypes.REMOVE_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter((id) => id !== action.payload),
            };
        case actionTypes.GET_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: {
                    items: action.payload.items,
                    cart: action.payload.shoppingCart,
                },
            };
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