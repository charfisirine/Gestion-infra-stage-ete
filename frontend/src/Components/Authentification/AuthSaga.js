import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import axios from 'axios';
import { setUserSigninSlice, setUserSignupSlice } from './AuthSlice';

export const authSaga = createSliceSaga({
  name: "authSaga",
  caseSagas: {
    *postSignin(action) {
      const response = yield call(() => axios.post("http://127.0.0.1:8080/api/auth/signin", action.payload));
      yield put(setUserSigninSlice(response.data));
    },

    *postSignup(action) {
      try {
        const response = yield call(() =>
          axios.post("http://127.0.0.1:8080/api/auth/signup", action.payload)
        );
        if (response.status === 200) {
          yield put(setUserSignupSlice(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { postSignin, postSignup } = authSaga.actions;
