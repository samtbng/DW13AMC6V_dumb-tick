import * as type from '../_redux/type';
const initialState = {
    data: ["data kosong"],
    isLoading: true,
    isError: false
}


const eventsToday = (state = initialState, action) => {
    switch (action.type) {
        case type.GET_EVENT_TODAY:
            return {
                ...state,
                data: action.payload.data
            }
        case type.GET_EVENT_TODAY_FULFILLED:
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case type.GET_EVENT_TODAY_REJECTED:
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

export default eventsToday