import {createStackNavigator} from "react-navigation-stack";
import colors from "../constants/colors";
import {FontAwesome} from "@expo/vector-icons";
import React from "react";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductsScreen from "../screens/user/EditProductsScreen";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
};

export default createStackNavigator({
      UserProducts: {
        screen: UserProductsScreen, navigationOptions: {
          headerTitle: "Your Products"
        }
      },
      EditProduct: EditProductsScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => <FontAwesome name={'user-circle-o'} size={23} color={drawerConfig.tintColor}/>
      },
      defaultNavigationOptions
    })
