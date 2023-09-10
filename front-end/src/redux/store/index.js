import eventReducer from '../events/eventSlice';
import userReducer from '../user/userSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
      event : eventReducer,
      user: userReducer
    }
  })