import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import { 
  setClusterList, 
  addClusterSlice, 
  deleteClusterSlice, 
  updateClusterSlice 
} from './ClusterSlice';
import { axiosInstance } from '../../app/axios-instance';

export const clusterSaga = createSliceSaga({
  name: "clusterSaga",
  caseSagas: {
    *getClustersList(action) {
      const response = yield call(() => axiosInstance.get("/clusters"));
      yield put(setClusterList(response.data));
    },

    *postClusterForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post("/clusters", action.payload)
        );
        if (response.status === 201) {
          yield put(addClusterSlice(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    },

    *deleteCluster(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/clusters/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteClusterSlice(action.payload));
        }
      } catch (error) {
        console.error(error);
      }
    },

    *updateCluster(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(`/clusters/${action.payload.id}`, action.payload)
        );
        if (response.status === 200) {
          yield put(updateClusterSlice(action.payload));
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { getClustersList, postClusterForm, deleteCluster, updateCluster } = clusterSaga.actions;
