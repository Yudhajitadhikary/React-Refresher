import { takeLatest,call,all,put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { fetchCategoriesFailure, fetchCategoriesSuccess } from "./category.action";
// import { fetchCategoriesStart } from "./category.action";


export function* fetchCategoriesAsync(){
    try{
        const categoryMap = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoryMap))
        }
        catch(error){
            yield put(fetchCategoriesFailure(error))
        }
}
export function* onFetchCategories(){
yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}
export function* categoriesSaga (){
yield all([call(onFetchCategories)])
}
