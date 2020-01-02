import * as type from '../_redux/type';
const initialState = {
    data: [],
    isLoading: true,
    isError: false,
    isLogin: false
}


const login = (state = initialState, action) => {
    switch (action.type) {
        case type.LOGIN:
            return {
                ...state,
                data: action.payload
            }
        case type.LOGIN_FULFILLED:
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case type.LOGIN_REJECTED:
            return {
                ...state,
                isLoading: true,
                isError: true,
                data: "Server Error"

            }
        default:
            return state;
    }
}

export default login