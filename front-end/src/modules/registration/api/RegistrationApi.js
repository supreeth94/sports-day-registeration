import { listOfEvents, listOfEvents2 } from "../../../utils/constants"


let allEvents = listOfEvents;
let registeredEvents = [];

export const getAllEvents = () =>{
    return allEvents;
}


export const getUserEvents = () =>{
    return registeredEvents;
}

export const updateUserEvent = (eventId,action) =>{
    let temp;
    if (action == 'register') {
        allEvents.map((eventData) => {
            if (eventData.id == eventId) {
                temp = eventData;
            }
        })
        allEvents = allEvents.filter(item => item !== temp)
        registeredEvents = [...registeredEvents, temp];
    } else {
        registeredEvents.map((eventData) => {
            if (eventData.id == eventId) {
                temp = eventData;
            }
        })
        registeredEvents = registeredEvents.filter(item => item !== temp)
        allEvents = [...allEvents, temp];
    }
    return registeredEvents;
}