import { createSelector } from "reselect";
import { categoriesReducer } from "./category.reducer";
export const selectCategories = (state) => state.categories.categoriesMap;

export const selectCategoriesIsLoading = createSelector([categoriesReducer], (categoriesSlice) => categoriesSlice.isLoading);