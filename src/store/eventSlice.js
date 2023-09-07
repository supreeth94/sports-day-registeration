import { removeId } from "../utils/array";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allEvents : [],
    userEvents : [],
    userBusyTime : []
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        fetchEvents: (state, action) => {
            state.allEvents = action.payload;
        },
        fetchUserEvents: (state, action) => {
            state.userEvents = action.payload;
        },
        registerEvent: (state, action) => {
            state.allEvents = removeId(state.allEvents, action.payload.id);
            state.userEvents = [...state.userEvents,action.payload];
            state.userBusyTime= [...state.userBusyTime, 
                { id: action.payload.id, 
                start_time: action.payload.start_time, 
                end_time: action.payload.end_time }];
        },
        unRegisterEvent: (state, action) => {
            state.allEvents = [...state.allEvents,action.payload];
            state.userEvents = removeId(state.userEvents, action.payload.id);
            state.userBusyTime = removeId(state.userBusyTime, action.payload.id);
        }
    }
})

export const {fetchEvents, fetchUserEvents, registerEvent, unRegisterEvent} = eventSlice.actions;
export default eventSlice.reducer;