import React from 'react';
import {CATEGORIES, MEALS} from "../data";
import MealList from "../components/MealList";

const CategoriesMealsScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');
  const displayedMeals = MEALS.filter(meal => meal.categoryId.indexOf(categoryId) >= 0);

  return <MealList data={displayedMeals} navigation={props.navigation}/>
};

CategoriesMealsScreen.navigationOptions = (navData) => {
  const categoryId = navData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoriesMealsScreen;
