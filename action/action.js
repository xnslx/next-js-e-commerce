import axios from "axios";

// export const addProductToFavList = (productId) => (dispatch, getState) => {
//     axios
//         .post("http://localhost:3000/api/favoritelist", { prodId: productId })
//         .then((result) => {
//             dispatch({ type: "ADD_PRODUCT_FAVORITE_LIST", payload: productId });
//             // localStorage.setItem(
//             //     "favlist",
//             //     JSON.stringify(getState().favoriteList.favoriteList)
//             // );
//         })
//         .catch((err) => {
//             dispatch({
//                 type: "GET_ERROR",
//                 payload: err.response.data,
//             });
//         });
// };

// export const removeProductFromFavList = (productId) => (dispatch, getState) => {
//     axios
//         .post("http://localhost:3000/api/favoritelist", { prodId: productId })
//         .then((result) => {
//             dispatch({ type: "REMOVE_PRODUCT_FAVORITE_LIST", payload: productId });
//             // localStorage.setItem(
//             //     "favlist",
//             //     JSON.stringify(getState().favoriteList.favoriteList)
//             // );
//         })
//         .catch((err) => {
//             dispatch({
//                 type: "GET_ERROR",
//                 payload: err.response.data,
//             });
//         });
// };

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
            localStorage.setItem(
                "favlist",
                JSON.stringify(getState().favoriteList.favoriteList)
            );
        })
        .catch((err) => {
            dispatch({
                type: "GET_ERROR",
                payload: err.response.data,
            });
        });
};

export const getProductFavList = (userId) => (dispatch) => {
    axios
        .get("http://localhost:3000/api/favoritelist")
        .then((result) => {
            dispatch({
                type: "GET_PRODUCT_FAVORITE_LIST",
                payload: result.data.map((item) => item.productId._id),
            });
            // localStorage.setItem(
            //     "favlist",
            //     JSON.stringify(result.data.map((item) => item.productId._id))
            // );
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