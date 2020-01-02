import axios from 'axios';
import {API} from '../_redux/type'

export const getOrdersPending = (id) => {

    return {
        type: 'GET_ORDERPENDING',
        payload: axios.get(`${API}/user/${id}/orders/pending`)
    }
}

export const getOrdersApproved = (id) => {

    return {
        type: 'GET_ORDER_APPROVED',
        payload: axios.get(`${API}/user/${id}/orders/approved`)
    }
}
