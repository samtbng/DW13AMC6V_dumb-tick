import * as type from '../_redux/type';
const initialState = {
    data: [],
    isLoading: true,
    isError: false,
}


const profile = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_PROFILE:
            return {
                ...state,
                data: action.payload
            }
        case type.GET_PROFILE_FULFILLED:
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case type.GET_PROFILE_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: "Server Error"

            }
        default:
            return state;
    }
}

export default profile