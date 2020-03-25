import {SET_FILTERS, TOGGLE_FAVORITE} from "../constants";

export const toggleFavorite = (mealId) => {
  return {type: TOGGLE_FAVORITE, payload: mealId}
};

export const setFilters = filterSettings => {
  return {type: SET_FILTERS, payload: filterSettings}
};
