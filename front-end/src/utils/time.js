export const isTimeInBetween = (t, obj) => {
    let givenTime = new Date(t);
    let startTime = new Date(obj.start_time);
    let endTime = new Date(obj.end_time);
    return givenTime >= startTime && givenTime <= endTime;
}