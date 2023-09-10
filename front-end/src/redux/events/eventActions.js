import axios, { Axios } from "axios";
import { fetchedEvents, registeredEvent, unRegisteredEvent, fetchedUserEvents } from "./eventSlice";

export const fetchAllEvents = () => {
    return dispatch => {
        axios.get('/events')
        .then(res => {
            if(res.data) {
                dispatch(fetchedEvents(res.data));
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

export const fetchUserEvents = (userId) => {
    return dispatch => {
        axios.get(`/users/${userId}/events`)
        .then(res => {
            if(res.data) {
                console.log("Fetched user events -> " + res.data);
                dispatch(fetchedUserEvents(res.data));
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

export const registerEvent = (userId, props) => {
    return dispatch => {
        axios.post(`/users/${userId}/register`, {
            event_id : props.event_id
        })
        .then(res => {
            if(res.data) {
                dispatch(registeredEvent(props));
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}

export const unRegisterEvent = (userId, props) => {
    return dispatch => {
        axios.post(`/users/${userId}/unregister`, {
            event_id : props.event_id
        })
        .then(res => {
            if(res.data) {
                dispatch(unRegisteredEvent(props));
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }
}