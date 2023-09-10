import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isUserLoggedIn : false,
    personalInfo : {},
    userLoginFailed : false,
    userSignupFailed : false,
    userSignupSuccess : false
}

const userSlice = createSlice({
    name : 'login',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.isUserLoggedIn = true;
            state.personalInfo = action.payload;
            state.userLoginFailed = false;
        },
        userLoginFailed: (state, action) => {
            state.userLoginFailed = action.payload;
            state.userSignupFailed = false;
        },
        userSignup: (state, action) => {
            if (action.payload == 'SUCCESS') {
                state.userSignupSuccess = true;
                state.userSignupFailed = false
            } else {
                state.userSignupSuccess = false;
                state.userSignupFailed = true;
                state.userLoginFailed = false;
            }
        }
    }
})

export const {userLoggedIn, userLoginFailed, userSignup} = userSlice.actions;
export default userSlice.reducer;