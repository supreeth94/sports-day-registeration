import React, { useEffect, useState } from "react";
import EventCard from './EventCard'
import { useSelector } from "react-redux";
import { isTimeInBetween } from "../../../utils/time";


function EventsList(props) {
    const {eventsTitle, listOfEvents} = props;

    let allEvents = (
        listOfEvents.map((eventData) => {
            
            return (
                <EventCard 
                    key = {eventData.id.toString()}
                    id = {eventData.id}
                    event_name={eventData.event_name} 
                    event_category={eventData.event_category} 
                    start_time={eventData.start_time} 
                    end_time={eventData.end_time}
                    // disabled={isBusyTime(eventData.start_time, eventData.end_time, eventData.id)}
                    />
            )
        })
    )
    return (
        <div>
            <h1>{eventsTitle}</h1>
            <div className="AllEventsList">
                    { allEvents }
            </div>
        </div>
    );
}

export default EventsList;