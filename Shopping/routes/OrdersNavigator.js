import {createStackNavigator} from "react-navigation-stack";
import {OrdersScreen} from "../screens/shop/OrdersScreen";
import colors from "../constants/colors";
import {MaterialIcons} from "@expo/vector-icons";
import React from "react";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
};

export default createStackNavigator({
      Orders: {
        screen: OrdersScreen, navigationOptions: {
          headerTitle: "Your Orders"
        }
      }
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => <MaterialIcons name={'list'} size={23} color={drawerConfig.tintColor}/>
      },
      defaultNavigationOptions
    })
