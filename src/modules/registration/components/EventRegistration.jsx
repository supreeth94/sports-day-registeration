import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";
import { getAllEvents, getUserEvents } from "../api/RegistrationApi";
import { useSelector, useDispatch } from "react-redux";


function EventRegistration() {

    const allEvents = useSelector(state => state.allEvents);
    const registeredEvents = useSelector(state => state.userEvents);
    const isUserLoggedIn = useSelector(state => state.isUserLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const ae = getAllEvents();
        dispatch({type: 'FETCH_EVENTS', payload: ae});
    }, [])
    
    return(
        <>
            {isUserLoggedIn && 
            <div className="EventRegisteration">
                <EventsList eventsTitle='All Events' listOfEvents = {allEvents}/>
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