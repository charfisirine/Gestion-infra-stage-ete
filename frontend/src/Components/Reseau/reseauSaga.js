import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setReseauSlice,
  addReseauSlice,
  deleteReseauSlice,
  updateReseauSlice,
} from './ReseauSlice'; // Assurez-vous que ces slices sont bien définis dans votre `ReseauSlice`
import { axiosInstance } from '../../app/axios-instance';

export const reseauSaga = createSliceSaga({
  name: "reseauSaga",
  caseSagas: {
    *getReseauxList() {
      try {
        const response = yield call(() => axiosInstance.get("/networks"));
        yield put(setReseauSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch networks:", error);
      }
    },

    *postReseauForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post(
            "/networks",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addReseauSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add network:", error);
      }
    },

    *deleteReseau(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/networks/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete network:", error);
      }
    },

    *updateReseau(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(
            `/networks/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Network updated successfully');
          yield put(updateReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update network:", error);
      }
    },
  },
});

export const {
  getReseauxList,
  postReseauForm,
  deleteReseau,
  updateReseau,
} = reseauSaga.actions;
