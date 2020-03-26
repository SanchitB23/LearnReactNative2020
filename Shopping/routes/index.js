import colors from "../constants/colors";
import {createDrawerNavigator} from "react-navigation-drawer";
import Products from "./ProductsNavigator";
import Orders from "./OrdersNavigator";
import Admin from "./AdminNavigator";
import {createAppContainer} from "react-navigation";


const MainNavigator = createDrawerNavigator({
  Products,
  Orders,
  Admin
}, {
  contentOptions: {
    activeTintColor: colors.primary
  }
});

export default createAppContainer(MainNavigator)
