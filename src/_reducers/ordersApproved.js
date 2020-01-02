import * as type from '../_redux/type';
const initialState = {
    data: ["data kosong"],
    isLoading: true,
    isError: false
}


const ordersApproved = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_ORDER_APPROVED:
            return {
                ...state,
                data: action.payload.data
            }
        case type.GET_ORDER_APPROVED_FULFILLED:
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case type.GET_ORDER_APPROVED_REJECTED:
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

export default ordersApproved