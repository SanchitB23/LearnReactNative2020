import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {addToCart, fetchProducts} from "../../store/actions/";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import colors from "../../constants/colors";


const ProductsOverviewScreen = (props) => {
      const products = useSelector(state => state.products.availableProducts);
      const dispatch = useDispatch();
      const [isLoading, setIsLoading] = useState(false);

      const viewDetails = (id, title) =>
          props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
          });

      const loadedProducts = useCallback(async () => {
        await dispatch(fetchProducts());
      }, [dispatch, setIsLoading]);

      useEffect(() => {
        setIsLoading(true);
        loadedProducts().then(() => setIsLoading(false))
      }, [dispatch]);

      useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadedProducts);
        return () => {
          willFocusSub.remove()
        }
      }, [loadedProducts]);

      if (isLoading) {
        return (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        )
      }
      if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
          <Text>No Data</Text>
        </View>
      }
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
              onRefresh={loadedProducts}
              refreshing={isLoading}
          />
      );
    }
;

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default ProductsOverviewScreen;
