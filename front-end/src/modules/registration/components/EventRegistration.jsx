import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllEvent, fetchUserEvents} from "../../../redux/events/eventActions";


function EventRegistration() {

    const registeredEvents = useSelector(state => state.event.userEvents);
    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn);
    const availableEvents = useSelector(state => state.event.availableEvents);
    const personalInfo = useSelector(state => state.user.personalInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (isUserLoggedIn) {
            dispatch(fetchAllEvent());
            dispatch(fetchUserEvents(personalInfo.user_id));
        }
    }, [])

    const handleLoginClick = () => {
        navigate("/login");
    }
    
    return(
        <>
            {isUserLoggedIn && 
            <div className="EventRegisteration">
                <EventsList eventsTitle='All Events' listOfEvents = {availableEvents}/>
                <EventsList eventsTitle='Registered Events' listOfEvents = {registeredEvents}/>
            </div>}

            {(!isUserLoggedIn) && 
            <div>
                <h1>Please Log in to register</h1>
                <button onClick={handleLoginClick}>Login</button>
            </div>}
        </>
    )
}
export default EventRegistration = React.memo(EventRegistration);