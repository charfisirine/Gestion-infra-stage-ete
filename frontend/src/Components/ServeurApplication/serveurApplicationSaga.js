import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setServeurApplicationSlice,
  addServeurApplicationSlice,
  deleteServeurApplicationSlice,
  updateServeurApplicationSlice,
} from './ServeurApplicationSlice';
import { axiosInstance } from '../../app/axios-instance';

export const serveurApplicationSaga = createSliceSaga({
  name: "serveurApplicationSaga",
  caseSagas: {
    *getServeurApplicationsList() {
      try {
        const response = yield call(() => axiosInstance.get("/server-applications"));
        yield put(setServeurApplicationSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch serveur applications:", error);
      }
    },

    *postServeurApplicationForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post(
            "/server-applications",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addServeurApplicationSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add serveur application:", error);
      }
    },

    *deleteServeurApplication(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/server-applications/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteServeurApplicationSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete serveur application:", error);
      }
    },

    *updateServeurApplication(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(
            `/server-applications/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Serveur application updated successfully');
          yield put(updateServeurApplicationSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update serveur application:", error);
      }
    },
  },
});

export const {
  getServeurApplicationsList,
  postServeurApplicationForm,
  deleteServeurApplication,
  updateServeurApplication,
} = serveurApplicationSaga.actions;
