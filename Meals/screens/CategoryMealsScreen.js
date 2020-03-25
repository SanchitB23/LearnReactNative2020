import React from 'react';
import {CATEGORIES, MEALS} from "../data";
import MealList from "../components/MealList";
import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import DefaultText from "../containers/DefaultText";

const CategoriesMealsScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(meal => meal.categoryId.indexOf(categoryId) >= 0);
  if (displayedMeals <= 0) {
    return <View style={style.noDataContainer}><DefaultText>No Meals found with such filters</DefaultText></View>
  }
  return <MealList data={displayedMeals} navigation={props.navigation}/>
};

CategoriesMealsScreen.navigationOptions = (navData) => {
  const categoryId = navData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(category => category.id === categoryId);
  return {
    headerTitle: selectedCategory.title
  };
};

const style = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CategoriesMealsScreen;
