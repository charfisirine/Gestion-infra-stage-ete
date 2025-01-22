import { put, call } from 'redux-saga/effects';
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import { addSiteSlice, deleteSiteSlice, setSiteSlice, updateSiteSlice } from './siteSlice';
import { axiosInstance } from '../../app/axios-instance';

export const sitesSaga = createSliceSaga({
    name: "sitesSaga",
    caseSagas: {
        *getsitesList() {
            const response = yield call(() => axiosInstance.get("/sites"));
            yield put(setSiteSlice(response.data));
        },

        *postSitesForm(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.post("/sites", action.payload)
                );
                if (response.status === 201) {
                    yield put(addSiteSlice(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        },

        *deleteSite(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.delete(`/sites/${action.payload}`)
                );
                if (response.status === 200) {
                    yield put(deleteSiteSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        },

        *updateSite(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.put(`/sites/${action.payload.id}`, action.payload)
                );
                if (response.status === 200) {
                    yield put(updateSiteSlice(response.data));
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
});

export const { getsitesList, postSitesForm, deleteSite, updateSite } = sitesSaga.actions;
export default sitesSaga;