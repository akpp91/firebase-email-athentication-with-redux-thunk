// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../userSlice';
import AuthReducer from '../AuthSlice';

const rootReducer = combineReducers({
  user: userReducer,
  Auth1: AuthReducer,
  // other reducers go here
});

export default rootReducer;
