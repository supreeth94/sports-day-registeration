
export const removeId = (arr, idToRemove) => {
    return arr.filter((item) => item.id !== idToRemove)
};

export const removeObjects = (originalArr, removeObj) => {
    return originalArr.filter((item) => !removeObj.includes(item));
}