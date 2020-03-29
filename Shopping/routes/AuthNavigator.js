import {createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import AuthScreen from "../screens/user/AuthScreen";
import DrawerNav from "./DrawerNav";
import colors from "../constants/colors";
import StartupScreen from "../screens/StartupScreen";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
};

const AuthNav = createStackNavigator({
  Auth: {
    screen: AuthScreen, navigationOptions: {
      headerTitle: 'Authentication'
    }
  }
}, {
  defaultNavigationOptions
});

export default createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNav,
  Shop: DrawerNav
})
