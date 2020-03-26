import {createStackNavigator} from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import colors from "../constants/colors";
import {Platform} from "react-native";
import {createAppContainer} from "react-navigation";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNavigator = createStackNavigator({
  ProductsOverview: {screen: ProductsOverviewScreen, navigationOptions: {headerTitle: 'All Products'}},
  ProductDetail: {screen: ProductDetailsScreen},
  Cart: CartScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
  }
});

export default createAppContainer(ProductsNavigator)
