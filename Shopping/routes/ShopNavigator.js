import colors from "../constants/colors";
import {createDrawerNavigator} from "react-navigation-drawer";
import Products from "./ProductsNavigator";
import Orders from "./OrdersNavigator";


export default createDrawerNavigator({
  Products,
  Orders
}, {
  contentOptions: {
    activeTintColor: colors.primary
  }
});

