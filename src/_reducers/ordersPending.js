import * as type from '../_redux/type';
const initialState = {
    data: ["data kosong"],
    isLoading: true,
    isError: false
}


const ordersPending = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_ORDERPENDING:
            return {
                ...state,
                data: action.payload.data
            }
        case type.GET_ORDERPENDING_FULFILLED:
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case type.GET_ORDERPENDING_REJECTED:
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

export default ordersPending