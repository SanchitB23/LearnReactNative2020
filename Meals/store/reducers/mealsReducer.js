import {MEALS} from "../../data";
import {SET_FILTERS, TOGGLE_FAVORITE} from "../constants";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.payload);
      if (existingIndex >= 0) {
        const updatedMeals = [...state.favoriteMeals];
        updatedMeals.splice(existingIndex, 1);
        return {...state, favoriteMeals: updatedMeals}
      } else return {
        ...state,
        favoriteMeals: state.favoriteMeals.concat(state.meals.find(meal => meal.id === action.payload))
      };
    case SET_FILTERS:
      const appliedFilters = action.payload;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.isGlutenFree && !meal.isGlutenFree) {
          return false
        }
        if (appliedFilters.isLactoseFree && !meal.isLactoseFree) {
          return false
        }
        if (appliedFilters.isVegetarian && !meal.isVegetarian) {
          return false
        }
        return !(appliedFilters.isVegan && !meal.isVegan);

      });
      return {...state, filteredMeals};
    default:
      return state
  }
};
