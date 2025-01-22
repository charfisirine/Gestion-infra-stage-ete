import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setSousReseauxSlice,
  addSousReseauSlice,
  deleteSousReseauSlice,
  updateSousReseauSlice,
} from './SousReseauSlice';
import { axiosInstance } from '../../app/axios-instance';

export const sousReseauSaga = createSliceSaga({
  name: "sousReseauSaga",
  caseSagas: {
    *getSousReseauxList() {
      try {
        const response = yield call(() => axiosInstance.get("/subnets"));
        yield put(setSousReseauxSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch sous réseaux:", error);
      }
    },

    *postSousReseauForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post(
            "/subnets",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addSousReseauSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add sous réseau:", error);
      }
    },

    *deleteSousReseau(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/subnets/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteSousReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete sous réseau:", error);
      }
    },

    *updateSousReseau(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(
            `/subnets/${action.payload.id}`,
            action.payload
          )
        );
        
        if (response.status === 200) {
          console.log('Sous réseau updated successfully');
          yield put(updateSousReseauSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update sous réseau:", error);
      }
    },
  },
});

export const {
  getSousReseauxList,
  postSousReseauForm,
  deleteSousReseau,
  updateSousReseau,
} = sousReseauSaga.actions;
