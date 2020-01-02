import axios from 'axios'
import {API} from '../_redux/type'

export const login = (id) => {

    return {
        type: 'LOGIN',
        payload: axios.get(`${API}/user/${id}`)
    }
}

export const getProfile = (id) => {

    return {
        type: 'GET_PROFILE',
        payload: axios.get(`${API}/users/${id}/detail`)
    }
}