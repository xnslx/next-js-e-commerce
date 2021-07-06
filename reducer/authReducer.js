import * as actionTypes from "../action/type";

const initialState = {
    user: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export default authReducer;