import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
    setClusterApplicationSlice,
    addClusterApplicationSlice,
    deleteClusterApplicationSlice,
    updateClusterApplicationSlice,
} from './ClusterApplicationSlice';
import { axiosInstance } from '../../app/axios-instance';

export const clusterApplicationSaga = createSliceSaga({
    name: "clusterApplicationSaga",
    caseSagas: {
        *getClusterApplicationList() {
            try {
                const response = yield call(() => axiosInstance.get("/cluster-applications"));
                yield put(setClusterApplicationSlice(response.data));
            } catch (error) {
                console.error("Error fetching cluster applications:", error);
            }
        },

        *postClusterApplicationForm(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.post(
                        "/cluster-applications",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addClusterApplicationSlice(response.data));
                }
            } catch (error) {
                console.error("Error posting cluster application:", error);
            }
        },

        *deleteClusterApplication(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.delete(`/cluster-applications/${action.payload}`)
                );
                if (response.status === 204) {
                    yield put(deleteClusterApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error("Error deleting cluster application:", error);
            }
        },

        *updateClusterApplication(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.put(
                        `/cluster-applications/${action.payload.id}`,
                        action.payload
                    )
                );
                if (response.status === 200) {
                    yield put(updateClusterApplicationSlice(response.data));
                }
            } catch (error) {
                console.error("Error updating cluster application:", error);
            }
        }
    },
});

export const {
    getClusterApplicationList,
    postClusterApplicationForm,
    deleteClusterApplication,
    updateClusterApplication,
} = clusterApplicationSaga.actions;

export default clusterApplicationSaga;
