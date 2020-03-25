import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from "./MealItem";

const MealList = ({navigation, data}) => {

  function renderMealItem(itemData) {
    return <MealItem data={itemData.item} onSelect={() => {
      navigation.navigate('MealDetail', {mealId: itemData.item.id})
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
