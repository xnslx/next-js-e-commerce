import axios from "axios";

export const toggleFavList = (productId) => (dispatch, getState) => {
    console.log("toggleFavList", productId);
    axios
        .post("/api/favoritelist", { prodId: productId })
        .then((result) => {
            console.log("result", result);
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
        .get("http://localhost:3000/api/favoritelist")
        .then((result) => {
            console.log("result", result);
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
    console.log("productId", productId);
    console.log("count", count);
    console.log("variantId", variantId);
    axios
        .post("http://localhost:3000/api/shoppingcart/addtoshoppingcart", {
            prodId: productId,
            quantity: count,
            variantId: variantId,
        })
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
        .post("http://localhost:3000/api/shoppingcart/removefromshoppingcart", {
            prodId: productId,
            quantity: count,
        })
        .then((result) => {
            console.log("result", result);
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
        .get("http://localhost:3000/api/shoppingcart/addtoshoppingcart")
        .then((result) => {
            console.log("getShoppingCart", result);
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