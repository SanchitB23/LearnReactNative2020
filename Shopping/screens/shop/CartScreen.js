import React from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import {removeFromCart} from "../../store/actions";

const CartScreen = () => {
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const tItems = [];
    for (const key in state.cart.items)
      if (state.cart.items.hasOwnProperty(key))
        tItems.push({
          productId: key,
          productTitle: state.cart.items[key].productTitle,
          productPrice: state.cart.items[key].productPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum
        });
    return tItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
  });
  const dispatch = useDispatch();
  return (
      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
          </Text>
          <Button title="Order Now" onPress={() => {
          }} color={colors.accent} disabled={cartItems.length === 0}/>
        </View>
        <FlatList data={cartItems} renderItem={item =>
            <CartItem data={item.item}
                      onRemove={() => dispatch(removeFromCart(item.item.productId))}/>}
                  keyExtractor={item => item.productId}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  summaryText: {
    fontSize: 18
  },
  amount: {
    color: colors.primary
  },
  cartTitle: {
    textTransform: 'uppercase'
  }
});

export default CartScreen;
