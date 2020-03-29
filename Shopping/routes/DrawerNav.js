import colors from "../constants/colors";
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import Products from "./ProductsNavigator";
import Orders from "./OrdersNavigator";
import Admin from "./MainNavigator";
import {Button, SafeAreaView, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../store/actions";

export default createDrawerNavigator({
  Products,
  Orders,
  Admin
}, {
  contentOptions: {
    activeTintColor: colors.primary
  },
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
        <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 5}}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props}/>
            <Button title="Logout" onPress={() => {
              dispatch(logout());
            }} color={colors.primary}/>
          </SafeAreaView>
        </View>
    )
  }
});
