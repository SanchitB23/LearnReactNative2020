import React from 'react';
import {Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {addToCart} from "../../store/actions/";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import colors from "../../constants/colors";


const ProductsOverviewScreen = (props) => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const viewDetails = (id, title) =>
      props.navigation.navigate('ProductDetail', {
        productId: id,
        productTitle: title
      });

  return (
      <FlatList
          data={products}
          renderItem={itemData =>
              <ProductItem
                  data={itemData.item}
                  onSelect={() => viewDetails(itemData.item.id, itemData.item.title)}>
                <Button color={colors.primary} title="View Details"
                        onPress={() => viewDetails(itemData.item.id, itemData.item.title)}/>
                <Button color={colors.primary} title="Add to Cart" onPress={() => dispatch(addToCart(itemData.item))}/>
              </ProductItem>
          }
      />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
        <HeaderButtons title={"NavDrawer"} HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName={"menu"} onPress={() => {
            navData.navigation.toggleDrawer()
          }}/>
        </HeaderButtons>
    ),
    headerRight: () => (<HeaderButtons title="Add to Cart" HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Cart" iconName={"shopping-cart"} onPress={() => {
        navData.navigation.navigate('Cart')
      }}/>
    </HeaderButtons>)
  }
};

export default ProductsOverviewScreen;
