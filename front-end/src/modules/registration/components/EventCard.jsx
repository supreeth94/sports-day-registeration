import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isTimeInBetween, isSameTime } from "../../../utils/time";
import { registerEvent, unRegisterEvent } from "../../../redux/events/eventActions";

function EventCard(props) {
    const {event_id, event_name, event_category, start_time, end_time} = props;
    const [buttonText, setButtonText] = useState("Select");
    const registeredEvents = useSelector(state => state.event.userEvents);
    const availableEvents = useSelector(state => state.event.availableEvents);
    const userBusyTime = useSelector(state => state.event.userBusyTime);
    const personalInfo = useSelector(state => state.user.personalInfo);

    const [isDisabled, setIsdisabled] = useState(false);
    const dispatch = useDispatch();

    const isBusyTime = (sTime, eTime, event_id) => {
        if (availableEvents.some(e => e.event_id === event_id)) {
            if(registeredEvents.length >= 3) {
                return true;
            } else {
                let isUserBusy = userBusyTime.map((obj) => {
                    if (isTimeInBetween(sTime, obj) || isTimeInBetween(eTime, obj) || isSameTime(sTime, eTime, obj)) {
                        console.log("The given time is within the specified range.   " +event_id);
                        return true;
                    }
                }).some(val => val)
                return isUserBusy;
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (availableEvents.some(e => e.event_id === event_id)) {
            setButtonText("Select");
        } else {
            setButtonText("Remove");
        }
    }, []);

    useEffect(() => {
        setIsdisabled(isBusyTime(start_time, end_time, event_id));
    }, [registeredEvents])

    const buttonClickListener = () => {
        if (buttonText == "Select") {
            dispatch(registerEvent(personalInfo.user_id, props));
        } else {
            dispatch(unRegisterEvent(personalInfo.user_id, props));
        }
    }

    let startDate = new Date(start_time), endDate = new Date(end_time);
    return (
        <div className="EventCard" style={{backgroundColor: (isDisabled ? 'grey' : 'white')}}>
            <h5>{event_name}</h5>
            <p>{event_category}</p>
            <p>{`${startDate.getHours()}:${(startDate.getMinutes()<10?'0':'') + startDate.getMinutes()}`} - {`${endDate.getHours()}:${(endDate.getMinutes()<10?'0':'') + endDate.getMinutes()}`}</p>
            <button disabled={isDisabled} onClick={buttonClickListener}>{buttonText}</button>
        </div>
    )
}

export default EventCard;