import axios from "axios";

export const toggleFavList = (productId) => (dispatch, getState) => {
    console.log("getState", getState());
    axios
        .post("/api/favoritelist", { prodId: productId })
        .then((result) => {
            console.log("result", result);
            dispatch({
                type: "TOGGLE_FAVORITE_LIST",
                payload: result.data.favList.map((i) => i.prodId),
            });
            localStorage.setItem("favlist", JSON.stringify(result.data.favList));
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
            localStorage.setItem("favlist", JSON.stringify(result.data.favoriteList));
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