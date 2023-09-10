import { userLoggedIn,  userLoginFailed, userSignup} from "./userSlice";
import axios, { Axios } from "axios";

axios.defaults.baseURL= 'http://localhost:5050'

export const validateUser = (personalInfo) => {
    return dispatch => {
        axios.post('/users/login', {
            email: personalInfo.email
        })
        .then( res => {
            if(res.data) {
                console.log(res.data);
                dispatch(userLoggedIn(res.data));
            }
        })
        .catch(err => {
            console.log(err.response.data.message);
            dispatch(userLoginFailed(true));
        })
    }
}

export const signUpUser = (personalInfo) => {
    return dispatch => {
        axios.post('/users/signup', {
            first_name: personalInfo.firstName,
            last_name: personalInfo.lastName,
            email: personalInfo.email
        })
        .then( res => {
            if(res.data) {
                dispatch(userSignup('SUCCESS'));
            }
        })
        .catch(err => {
            console.log(err.response.data.message);
            dispatch(userSignup('FAILED'));
        })
    }
}