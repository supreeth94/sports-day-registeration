import { removeObjectsById, removeElement, fetchObjectsById } from "../../utils/array";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //All the events held on sports day
    allEvents : [],
    //All the events available for registeration for the user
    availableEvents : [],
    //All the events that the user has registered for
    userEvents : [],
    //All the event Ids that the user has registered for
    userEventIds : [],
    //All the time slots user has registered for
    userBusyTime : []
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {

        //This action is to be dispatched when all the events are fetched
        fetchedEvents: (state, action) => {
            state.allEvents = action.payload;
        },

        //This action is to be dispatched when all the user registered events are fetched
        fetchedUserEvents: (state, action) => {
            state.userEventIds = action.payload;
            state.userEvents = fetchObjectsById(state.allEvents, action.payload)
            //Events available for registeration are allEvents - user registered events
            state.availableEvents = removeObjectsById(state.allEvents, action.payload);
            //Update the user busy time list with the time slot of the registered event
            state.userEvents.forEach(element => {
                state.userBusyTime = [...state.userBusyTime, 
                    { event_id: element.event_id, 
                    start_time: element.start_time, 
                    end_time: element.end_time }];
            });
        },

        //This action is to be dispatched when the user registers for an event
        registeredEvent: (state, action) => {
            //Update the user registered events list with registered event id
            state.userEventIds = [...state.userEventIds, action.payload.event_id];
            state.userEvents = fetchObjectsById(state.allEvents, state.userEventIds)
            //Update the available events list by removing the registered event from it
            state.availableEvents = removeObjectsById(state.allEvents, state.userEventIds);
            //Update the user busy time list with the time slot of the registered event
            state.userBusyTime= [...state.userBusyTime, 
                { event_id: action.payload.event_id, 
                start_time: action.payload.start_time, 
                end_time: action.payload.end_time }];
        },
        unRegisteredEvent: (state, action) => {
            //Update the available events list by adding the unregistered event to it
            state.availableEvents = [...state.availableEvents, action.payload];
            //Update the user registered events list by removing the unregistered event id
            state.userEventIds = removeElement(state.userEventIds, action.payload.event_id);
            state.userEvents = fetchObjectsById(state.allEvents, state.userEventIds)
            //Update the user busy time list with by removing the time slot of the unregistered event
            state.userBusyTime = removeObjectsById(state.userBusyTime, [action.payload.event_id]);
        }
    }
})

export const {fetchedEvents, fetchedUserEvents, registeredEvent, unRegisteredEvent} = eventSlice.actions;
export default eventSlice.reducer;