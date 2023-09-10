
export const removeObjectsById = (arr, idsToRemove) => {
    return arr.filter((item) => !idsToRemove.includes(item.event_id));
};

// export const removeObjects = (originalArr, removeArray) => {
//         removeArray.forEach(id => {
//             originalArr = removeObjectById(originalArr, id)
//         });
//     return originalArr;
// };

export const removeElement = (arr, eleToRemove) => {
    return arr.filter((item) => eleToRemove !== (item));
};

export const fetchObjectById = (arr, idToFetch) => {
    return arr.filter((item) => idToFetch.includes(item.event_id));
};