import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  email:'',
  password:'',
  isLoggedIn: false,
  user: null,
  loading: false,
  auth:null
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState  ,
  reducers: 
  {
    emailChange: (state, action) => {
    
      return {...state, email: action.payload};
    },
    passwordChange: (state, action) => {
    
      return {...state, password: action.payload};
    },
    
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading=false;      

    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.email='',
      state.password=''
    },
    setLoading(state , action)
    {
        return {...state, loading:action.payload };
    },

    setLoadingFalse(state, action)
    {
      return {...state, loading:action.payload };
    },

    setAuth(state, action)
    {
      return {...state, auth:action.payload };
    }
  },
});

export const { setAuth, setLoadingFalse, setLoading,loginSuccess ,logoutSuccess, loginUser,emailChange, passwordChange } = AuthSlice.actions;
// This line is exporting the action creator function setMessage that was automatically generated 
// by createSlice. You can use this function in your React components to dispatch actions 
// that the messageSlice reducer can respond to.

// Selectors
export const userSelectors = {
  isLoggedIn: (state) => state.user.isLoggedIn,
  user: (state) => state.user.user,
};

export default AuthSlice.reducer;
