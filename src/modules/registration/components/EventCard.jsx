import React, { useEffect, useState } from "react";
import { updateUserEvent } from "../api/RegistrationApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isTimeInBetween } from "../../../utils/time";

function EventCard(props) {
    const {id, event_name, event_category, start_time, end_time} = props;
    const [buttonText, setButtonText] = useState("Select");
    const allEvents = useSelector(state => state.allEvents);
    const registeredEvents = useSelector(state => state.userEvents);
    const userBusyTime = useSelector(state => state.userBusyTime);
    const [isDisabled, setIsdisabled] = useState(false);
    const dispatch = useDispatch();

    const isBusyTime = (sTime, eTime, id) => {
        if (allEvents.some(e => e.id === id)) {
            if(registeredEvents.length >= 3) {
                return true;
            } else {
                userBusyTime.map((obj) => {
                    if (isTimeInBetween(sTime, obj) || isTimeInBetween(eTime, obj)) {
                        console.log("The given time is within the specified range.   " +id);
                        return true;
                    }
                })
                return false;
            }
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (allEvents.some(e => e.id === id)) {
            setButtonText("Select");
        } else {
            setButtonText("Remove");
        }
    }, []);

    useEffect(() => {
        setIsdisabled(isBusyTime(start_time, end_time, id));
    }, [registeredEvents])

    const buttonClickListener = () => {
        if (buttonText == "Select") {
            dispatch({type: 'REGISTER_EVENT', payload: props});
        } else {
            dispatch({type: 'UN_REGISTER_EVENT', payload: props});
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