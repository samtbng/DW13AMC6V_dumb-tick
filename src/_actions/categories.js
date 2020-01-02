import axios from 'axios';
import {API} from '../_redux/type';

export const getCategory = () => {

    return {
        type: 'GET_CATEGORY',
        payload: axios.get(`${API}/categories`)
    }
}