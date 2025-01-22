import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setServeurSlice,
  addServeurSlice,
  deleteServeurSlice,
  updateServeurSlice,
} from './ServeurSlice';
import { axiosInstance } from '../../app/axios-instance';

export const serveurSaga = createSliceSaga({
  name: "serveurSaga",
  caseSagas: {
    *getServeursList() {
      try {
        const response = yield call(() => axiosInstance.get("/servers"));
        yield put(setServeurSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch serveurs:", error);
      }
    },

    *postServeurForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post(
            "/servers",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addServeurSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add serveur:", error);
      }
    },

    *deleteServeur(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/servers/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete serveur:", error);
      }
    },

    *updateServeur(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(
            `/servers/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Serveur updated successfully');
          yield put(updateServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update serveur:", error);
      }
    },
  },
});

export const {
  getServeursList,
  postServeurForm,
  deleteServeur,
  updateServeur,
} = serveurSaga.actions;
