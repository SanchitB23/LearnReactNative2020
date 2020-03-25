import React from 'react';
import MealList from "../components/MealList";
import {MEALS} from "../data";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../containers/CustomHeaderButton";

const FavoritesScreen = (props) => {
  const favDummy = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2');

  return <MealList data={favDummy} navigation={props.navigation}/>

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
export default FavoritesScreen;
