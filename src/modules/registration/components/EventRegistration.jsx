import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";
import { getAllEvents, getUserEvents } from "../api/RegistrationApi";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, fetchUserEvents } from "../../../store/eventSlice";
import { removeObjects } from "../../../utils/array";


function EventRegistration() {

    const allEvents = useSelector(state => state.event.allEvents);
    const registeredEvents = useSelector(state => state.event.userEvents);
    const isUserLoggedIn = useSelector(state => state.login.isUserLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const ae = getAllEvents();
        const re = getUserEvents();
        dispatch(fetchEvents(ae));
        dispatch(fetchUserEvents(re));
    }, [])
    
    return(
        <>
            {isUserLoggedIn && 
            <div className="EventRegisteration">
                <EventsList eventsTitle='All Events' listOfEvents = {removeObjects(allEvents, registeredEvents)}/>
                <EventsList eventsTitle='Registered Events' listOfEvents = {registeredEvents}/>
            </div>}

            {(!isUserLoggedIn) && 
            <div>
                <h1>Please Log in to register</h1>
            </div>}
        </>
    )
}
export default EventRegistration;