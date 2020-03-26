import {createStackNavigator} from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";
import colors from "../constants/colors";
import React from "react";
import {MaterialIcons} from "@expo/vector-icons";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
};

export default createStackNavigator({
  ProductsOverview: {screen: ProductsOverviewScreen, navigationOptions: {headerTitle: 'All Products'}},
  ProductDetail: {screen: ProductDetailsScreen},
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <MaterialIcons name={'shopping-cart'} size={23} color={drawerConfig.tintColor}/>
  },
  defaultNavigationOptions
});
