import axios from 'axios';
import {API} from '../_redux/type';

export const getEvents = () => {

    return {
        type: 'GET_EVENT',
        payload: axios.get(`${API}/events`)
    }
}

export const getEventsToday = (date) => {

    return {
        type: 'GET_EVENT_TODAY',
        payload: axios.get(`${API}/events/${date}`)
    }
}

export const getEventsTomorrow = (date) => {

    return {
        type: 'GET_EVENT_TOMORROW',
        payload: axios.get(`${API}/events/${date}`)
    }
}

export const getDetailEvent = (id) => {

    return {
        type: 'GET_EVENT_DETAIL',
        payload: axios.get(`${API}/event/${id}`)
    }
}


export const getEventsCategory = (id) => {

    return {
        type: 'GET_EVENT_CATEGORY',
        payload: axios.get(`${API}/category/${id}/events`)
    }
}