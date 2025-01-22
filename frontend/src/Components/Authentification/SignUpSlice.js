import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: JSON.parse(window.localStorage.getItem("userName")) || null,
  email: JSON.parse(window.localStorage.getItem("email")) || null,
  token: window.localStorage.getItem("token") || null,
  token: window.localStorage.getItem("token") || null,
};

export const SignInSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;

      if (action.payload.token) {
        window.localStorage.setItem("token", action.payload.token);
        window.localStorage.setItem("email", action.payload.email);

        window.localStorage.setItem(
          "userName",
          JSON.stringify(action.payload.userusername)
        );
      } else {
        window.localStorage.clear();
      }
    },
  },
});

export const { setUserSlice } = SignInSlice.actions;
