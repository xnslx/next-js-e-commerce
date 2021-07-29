import * as actionTypes from "../action/type";
import { intlState } from "./index";
// import arrayUnique from "../utils/helper";

const shoppingCartReducer = (state = intlState, action) => {
    console.log("action", action.payload);
    switch (action.type) {
        case actionTypes.ADD_SHOPPING_CART:
            // if (state.shoppingCart.includes(action.payload)) {
            //     return {...state, shoppingCart: state.shoppingCart };
            // } else {
            //     const updatedItem = state.shoppingCart.concat(action.payload);
            //     return {...state, shoppingCart: updatedItem };
            // }
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
            // const result = arrayUnique(
            //     action.payload.items,
            //     action.payload.shoppingCart
            // );
            // console.log("result", result);
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