import React from 'react';
import MealList from "../components/MealList";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../containers/CustomHeaderButton";
import {useSelector} from "react-redux";
import {StyleSheet, View} from "react-native";
import DefaultText from "../containers/DefaultText";

const FavoritesScreen = (props) => {

  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

  if (favoriteMeals.length <= 0 || !favoriteMeals) return <View style={styles.noFavContainer}><DefaultText>No Favorite
    Meals
    Found, Start adding now!</DefaultText></View>;

  return <MealList data={favoriteMeals} navigation={props.navigation}/>

};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderButtons title="NavBar" HeaderButtonComponent={CustomHeaderButton}>
      <Item title={"Menu"} iconName="menu" onPress={() => {
        navData.navigation.toggleDrawer()
      }}/>
    </HeaderButtons>
  }
};
const styles = StyleSheet.create({
  noFavContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default FavoritesScreen;
