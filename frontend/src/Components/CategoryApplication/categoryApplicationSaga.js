import { put, call } from 'redux-saga/effects';
import { createSliceSaga } from "redux-toolkit-saga"
import { addCategorySlice, deleteCategorySlice, setCategoryApplicationSlice, updateCategorySlice } from './CategoryApplicationSlice';
import { axiosInstance } from '../../app/axios-instance';

export const appcategoriesSaga = createSliceSaga({
    name: "appcategoriesSaga",
    caseSagas: {
        *getappcategoriesList(data) {
            const response = yield call(() => axiosInstance.get("/category-apps"))
            yield put(setCategoryApplicationSlice(response.data))
        },

        *postAppCategoriesForm(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.post(
                        "/category-apps",
                        action.payload
                    )
                );
                if (response.status === 201) {
                    yield put(addCategorySlice(response.data))
                }
            } catch (error) {
                console.log(error);
            }
        },
        *deleteCategory(action) {
            try {
                const response = yield call(() =>
                    axiosInstance.delete(`/category-apps/${action.payload}`)
                );
                if (response.status === 204) {
                    yield put(deleteCategorySlice(action.payload))                }
            } catch (error) {
                console.error(error);
            }},

            *updateCategory(action) {
                try {
                    const response = yield call(() =>
                        axiosInstance.put(
                            `/category-apps/${action.payload.id}`,
                            action.payload
                        )
                    );
                    if (response.status === 200) {
                        console.log('Category updated successfully');
                        yield put(updateCategorySlice(action.payload)); 
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        

    }
})

export const { getappcategoriesList, postAppCategoriesForm,deleteCategory ,updateCategory} = appcategoriesSaga.actions;