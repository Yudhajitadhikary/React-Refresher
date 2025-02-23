import { CATEGORIES_ACTION_TYPES } from "./category.types";
export const CATEGORY_INIIAL_STATE = {
    categoriesMap:{},
    isLoading:false,
    error:null
}
export const categoriesReducer = (state = CATEGORY_INIIAL_STATE, action={}) => {
const {type,payload}=action;
switch(type){
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
        return{
            ...state,
            isLoading:true
        }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
        return{
            ...state,
            isLoading:false,
            error:payload
        }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
        return{
            ...state,
            categoriesMap:payload,
            isLoading:false
        }
    default:
        return state;
}
}