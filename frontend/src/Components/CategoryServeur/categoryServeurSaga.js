import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga";
import {
  setCategoryServeurSlice,
  addCategoryServeurSlice,
  deleteCategoryServeurSlice,
  updateCategoryServeurSlice,
} from './CategoryServeurSlice';
import { axiosInstance } from '../../app/axios-instance';

export const categoryServeurSaga = createSliceSaga({
  name: "categoryServeurSaga",
  caseSagas: {
    *getCategoryServeursList() {
      try {
        const response = yield call(() => axiosInstance.get("/server-categories"));
        yield put(setCategoryServeurSlice(response.data));
      } catch (error) {
        console.error("Failed to fetch category serveurs:", error);
      }
    },

    *postCategoryServeurForm(action) {
      try {
        const response = yield call(() =>
          axiosInstance.post(
            "/server-categories",
            action.payload
          )
        );
        if (response.status === 201) {
          yield put(addCategoryServeurSlice(response.data));
        }
      } catch (error) {
        console.error("Failed to add category serveur:", error);
      }
    },

    *deleteCategoryServeur(action) {
      try {
        const response = yield call(() =>
          axiosInstance.delete(`/server-categories/${action.payload}`)
        );
        if (response.status === 204) {
          yield put(deleteCategoryServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to delete category serveur:", error);
      }
    },

    *updateCategoryServeur(action) {
      try {
        const response = yield call(() =>
          axiosInstance.put(
            `/server-categories/${action.payload.id}`,
            action.payload
          )
        );
        if (response.status === 200) {
          console.log('Category serveur updated successfully');
          yield put(updateCategoryServeurSlice(action.payload));
        }
      } catch (error) {
        console.error("Failed to update category serveur:", error);
      }
    },
  },
});

export const {
  getCategoryServeursList,
  postCategoryServeurForm,
  deleteCategoryServeur,
  updateCategoryServeur,
} = categoryServeurSaga.actions;
