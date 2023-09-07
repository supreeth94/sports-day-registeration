import { userLoggedIn } from "./loginSlice";

export const validateUser = (personalInfo) => {
    return dispatch => {
        dispatch(userLoggedIn(personalInfo));
    }
}