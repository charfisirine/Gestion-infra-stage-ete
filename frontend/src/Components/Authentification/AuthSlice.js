import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userId: null,
  // username: null,
  // email: null,
  accessToken: window.localStorage.getItem("accessToken"),
  signedUp: null,
  signedIn: null,
  isAuthenticated: window.localStorage.getItem("isAuthenticated"),
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserSigninSlice: (state, action) => {
      if (action.payload.token) {
        window.localStorage.setItem("accessToken", action.payload.token);
        window.localStorage.setItem("isAuthenticated", true);
        // state.userId = action.payload.id;
        // state.username = action.payload.username;
        // state.email = action.payload.email;
        state.token = action.payload.token;
        state.isAuthenticated = action.payload.token;
        state.signedIn = true;
      }
    },
    setUserLogoutSlice: (state) => {
      state.signedIn = false;
      state.token = null;
      state.isAuthenticated = false;
      window.localStorage.setItem("accessToken", false);
      window.localStorage.setItem("isAuthenticated", false);
    },
    setUserSignupSlice: (state) => {
      state.signedUp = true;
    },
  },
});

export const { setUserSigninSlice, setUserSignupSlice, setUserLogoutSlice } = AuthSlice.actions;
export default AuthSlice.reducer;
