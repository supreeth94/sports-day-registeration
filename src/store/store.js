import { createStore } from "redux";
import { listOfEvents, listOfEvents2 } from "../utils/constants";
import { removeId } from "../utils/array";

const initData = {
    allEvents : [],
    userEvents : [],
    isUserLoggedIn : false,
    userBusyTime : []
}

const reducer = (state = initData, action) => {

    if (action.type === 'REGISTER_EVENT') {
        return {
            ...state,
            allEvents: removeId(state.allEvents, action.payload.id),
            userEvents: [...state.userEvents,action.payload],
            userBusyTime: [...state.userBusyTime, 
                { id: action.payload.id, 
                start_time: action.payload.start_time, 
                end_time: action.payload.end_time }]
        }
    } else if (action.type === 'FETCH_EVENTS') {
        return {
            ...state,
            allEvents: action.payload
        }
    } else if (action.type === 'UN_REGISTER_EVENT') {
        return {
            ...state,
            allEvents: [...state.allEvents,action.payload],
            userEvents: removeId(state.userEvents, action.payload.id),
            userBusyTime: removeId(state.userBusyTime, action.payload.id)
        }
    } else if (action.type === 'USER_LOGGED_IN') {
        return {
            ...state,
            isUserLoggedIn : true
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;