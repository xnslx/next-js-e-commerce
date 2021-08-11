import axios from "axios";

export const toggleFavList = (productId) => (dispatch, getState) => {
    axios
        .post("https://next-js-e-commerce-xnslx.vercel.app/api/favoritelist", {
            prodId: productId,
        })
        .then((result) => {
            dispatch({
                type: "ADD_FAVORITE_LIST",
                payload: result.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};

export const getProductFavList = () => (dispatch) => {
    axios
        .get("https://next-js-e-commerce-xnslx.vercel.app/api/favoritelist")
        .then((result) => {
            dispatch({
                type: "GET_PRODUCT_FAVORITE_LIST",
                payload: result.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};

export const getErrorMessage = (error) => {
    return {
        type: "GET_ERROR",
        payload: error,
    };
};

export const clearError = () => {
    return {
        type: "CLEAR_ERROR",
    };
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("favlist");
    // localStorage.removeItem("shoppingcart");
    dispatch({
        type: "USER_LOGOUT",
    });
};

export const addShoppingCart = (count, variantId, productId) => (
    dispatch,
    getState
) => {
    axios
        .post(
            "https://next-js-e-commerce-xnslx.vercel.app/api/shoppingcart/addtoshoppingcart", {
                prodId: productId,
                quantity: count,
                variantId: variantId,
            }
        )
        .then((result) => {
            console.log("actionjs2", result);
            dispatch({
                type: "ADD_SHOPPING_CART",
                payload: result.data.shoppingCart,
            });
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};

export const removeShoppingCart = (productId, count) => (
    dispatch,
    getState
) => {
    axios
        .post(
            "https://next-js-e-commerce-xnslx.vercel.app/api/shoppingcart/removefromshoppingcart", {
                prodId: productId,
                quantity: count,
            }
        )
        .then((result) => {
            dispatch({
                type: "REMOVE_SHOPPING_CART",
                payload: productId,
            });
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};

export const getShoppingCart = () => (dispatch) => {
    axios
        .get(
            "https://next-js-e-commerce-xnslx.vercel.app/api/shoppingcart/addtoshoppingcart"
        )
        .then((result) => {
            dispatch({
                type: "GET_SHOPPING_CART",
                payload: result.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};