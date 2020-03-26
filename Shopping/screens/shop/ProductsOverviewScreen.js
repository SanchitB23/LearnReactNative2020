import React from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {addToCart} from "../../store/actions/";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";

const ProductsOverviewScreen = (props) => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
      <FlatList
          data={products}
          renderItem={itemData =>
              <ProductItem
                  data={itemData.item}
                  onAddToCart={() => dispatch(addToCart(itemData.item))}
                  onViewDetails={() =>
                      props.navigation.navigate('ProductDetail', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                      })}
              />}
      />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (<HeaderButtons title="Add to Cart" HeaderButtonComponent={CustomHeaderButton}>
      <Item title="Cart" iconName={"shopping-cart"} onPress={() => {
        navData.navigation.navigate('Cart')
      }}/>
    </HeaderButtons>)
  }
};

export default ProductsOverviewScreen;
