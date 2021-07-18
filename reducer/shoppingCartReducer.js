import * as actionTypes from "../action/type";
import { intlState } from "./index";

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
                shoppingCart: [
                    state.shoppingCart,
                    {
                        prodId: action.payload.map((i) => i.prdoId),
                        quantity: action.payload.map((i) => i.quantity),
                    },
                ],
            };
        case actionTypes.REMOVE_SHOPPING_CART:
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter((id) => id !== action.payload),
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