import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import { addApplicationSlice, deleteApplicationSlice, setApplicationSlice, updateApplicationSlice } from './ApplicationSlice';
import { axiosInstance } from '../../app/axios-instance';

export const applicationsSaga = createSliceSaga({
    name: "applicationsSaga",
    caseSagas: {
        *getApplicationList() {
            const response = yield call(() => axiosInstance.get("/applications"));
            yield put(setApplicationSlice(response.data));
        },

        *postApplicationForm(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.post(
                        "/applications",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addApplicationSlice(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        },

        *deleteApplication(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.delete(`/applications/${action.payload}`)
                );
                if (response.status === 204) {
                    yield put(deleteApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        },

        *updateApplication(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.put(
                        `/applications/${action.payload.id}`,
                        action.payload
                    )
                );
                if (response.status === 200) {
                    yield put(updateApplicationSlice(action.payload));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
});

export const { getApplicationList, postApplicationForm, deleteApplication, updateApplication } = applicationsSaga.actions;
export default applicationsSaga.reducer;
