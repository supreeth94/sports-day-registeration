export const isTimeInBetween = (t, obj) => {
    let givenTime = new Date(t);
    let startTime = new Date(obj.start_time);
    let endTime = new Date(obj.end_time);
    return givenTime > startTime && givenTime < endTime;
}

export const isSameTime = (t1, t2, obj) => {
    let time1 = new Date(t1);
    let time2 = new Date(t2);
    let startTime = new Date(obj.start_time);
    let endTime = new Date(obj.end_time);
    return (time1 == startTime && time2 == endTime);
}