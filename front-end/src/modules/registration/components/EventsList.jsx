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
                    key = {eventData.event_id.toString()}
                    event_id = {eventData.event_id}
                    event_name={eventData.event_name} 
                    event_category={eventData.event_category} 
                    start_time={eventData.start_time} 
                    end_time={eventData.end_time}
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