import React from "react";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {Platform, Text} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

import colors from "../constants/colors";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoriesMealsScreen from "../screens/CategoryMealsScreen";
import MealsDetailsScreen from "../screens/MealDetailsScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primaryColor : 'white'
  },
  headerTextStyle: {fontFamily: 'open-sans-bold'},
  headerBackTextStyle: {fontFamily: 'open-sans-bold'},
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primaryColor
};

const MealsStackNavigator = createStackNavigator({
      Categories: {screen: CategoriesScreen, navigationOptions: {title: 'Meal Categories'}},
      CategoryMeals: CategoriesMealsScreen,
      MealDetail: MealsDetailsScreen
    },
    {
      initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavoriteStackNavigator = createStackNavigator({
  Favorites: {screen: FavoritesScreen, navigationOptions: {title: "Your Favorites"}},
  MealDetail: MealsDetailsScreen
}, {
  initialRouteName: 'Favorites',
  defaultNavigationOptions: defaultStackNavOptions
});

const tabRoutes = {
  Meals: {
    screen: MealsStackNavigator, navigationOptions: {
      tabBarIcon: (tabBarInfo) => <MaterialIcons name="restaurant-menu" size={25} color={tabBarInfo.tintColor}/>,
      tabBarColor: colors.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    }
  },
  Favorites: {
    screen: FavoriteStackNavigator, navigationOptions: {
      tabBarIcon: (tabBarInfo) => <MaterialIcons name="favorite" size={25} color={tabBarInfo.tintColor}/>,
      tabBarColor: colors.secondaryColor,
      tabBarLabel: Platform.OS === 'android' ?
          <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
    }
  }
};

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabRoutes, {
      shifting: true
    })
    : createBottomTabNavigator(tabRoutes, {
      tabBarOptions: {
        labelStyle: {fontFamily: 'open-sans'},
        activeTintColor: colors.secondaryColor
      }
    });

const FilterStackNavigator = createStackNavigator({
  Filters: {screen: FiltersScreen, navigationOptions: {title: 'Set Filter'}}
}, {
  defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator, navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FilterStackNavigator
}, {
  contentOptions: {
    activeTintColor: colors.secondaryColor,
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator)
