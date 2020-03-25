import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {MEALS} from "../data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../containers/CustomHeaderButton";
import DefaultText from "../containers/DefaultText";

const ListItem = (props) => <View style={styles.listItem}>
  <DefaultText>{props.children}</DefaultText>
</View>;


const MealsDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
      <ScrollView>
        <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
        <View style={styles.details}>
          <DefaultText>{selectedMeal.duration}m</DefaultText>
          <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <View>
          <Text style={styles.titleText}>Ingredients</Text>
          {selectedMeal.ingredients.map((ingredient, i) => <ListItem key={i}>{ingredient}</ListItem>)}
          <Text style={styles.titleText}>Steps</Text>
          {selectedMeal.steps.map((step, i) => <ListItem key={i}>{step}</ListItem>)}
        </View>
      </ScrollView>
  );
};

MealsDetailsScreen.navigationOptions = (navData) => {
  const mealId = navData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => <HeaderButtons title="Favorites" HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Favorite" iconName="favorite" onPress={() => console.log("Favorite Clicked")}/>
    </HeaderButtons>
  }
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 250
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10
  }
});

export default MealsDetailsScreen;
