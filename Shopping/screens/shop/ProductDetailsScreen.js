import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import colors from "../../constants/colors";
import {addToCart} from "../../store/actions";

const ProductDetailsScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
  return (
      <ScrollView>
        <Image source={{uri: selectedProduct.imageUrl}} style={styles.image}/>
        <View style={styles.actions}>
          <Button color={colors.primary} title="Add to Cart" onPress={() => dispatch(addToCart(selectedProduct))}/>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 300
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  }
});

ProductDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  }
};

export default ProductDetailsScreen;
