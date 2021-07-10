import axios from "axios";

export const toggleFavList = (productId) => (dispatch, getState) => {
    axios
        .post("/api/favoritelist", { prodId: productId })
        .then((result) => {
            console.log("result", result);
            dispatch({
                type: "ADD_FAVORITE_LIST",
                payload: result.data.favList.map((i) => i.prodId),
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
                payload: result.data.favoriteList,
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

export const addShoppingCart = (productId, count) => (dispatch, getState) => {
    console.log("action.js", count);
    axios
        .post("http://localhost:3000/api/shoppingcart/addtoshoppingcart", {
            prodId: productId,
            quantity: count,
        })
        .then((result) => {
            console.log("result", result);
            dispatch({
                type: "ADD_SHOPPING_CART",
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
        .get("http://localhost:3000/api/shoppingcart")
        .then((result) => {
            console.log("result", result);
            dispatch({
                type: "GET_SHOPPING_CART",
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