import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from "./MealItem";
import {useSelector} from "react-redux";

const MealList = ({navigation, data}) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  function renderMealItem(itemData) {
    const isFav = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return <MealItem data={itemData.item} onSelect={() => {
      navigation.navigate('MealDetail', {mealId: itemData.item.id, mealTitle: itemData.item.title, isFav})
    }}/>
  }

  return (
      <View style={styles.container}>
        <FlatList data={data} renderItem={renderMealItem} style={{width: '100%'}}/>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});
export default MealList;
