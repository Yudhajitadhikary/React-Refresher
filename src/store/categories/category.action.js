import createReducer from '../../utils/reducer/reducer.utils'
import {CATEGORIES_ACTION_TYPES} from './category.types'
import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils'
export const setCategoriesMap=(categoriesMap)=>createReducer(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,categoriesMap)
export const fetchCategoriesStart=()=>createReducer(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
export const fetchCategoriesSuccess=(categoriesMap)=>createReducer(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesMap)
export const fetchCategoriesFailure=(error)=>createReducer(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,error)
export const fetchCategoriesAsync=()=>async (dispatch)=>{
    dispatch(fetchCategoriesStart())
    try{
    const categoryMap = await getCategoriesAndDocuments('categories');
    dispatch(fetchCategoriesSuccess(categoryMap))
    }
    catch(error){
        dispatch(fetchCategoriesFailure(error))
    }
}