import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isUserLoggedIn : false,
    personalInfo : {}
}

const loginSlice = createSlice({
    name : 'login',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.isUserLoggedIn = true;
            state.personalInfo = action.payload;
        }
    }
})

export const {userLoggedIn} = loginSlice.actions;
export default loginSlice.reducer;