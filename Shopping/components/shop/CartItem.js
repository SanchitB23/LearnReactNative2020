import React from 'react';
import {Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const CartItem = (props) => {
  const {data, deletable} = props;
  const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
      <View style={styles.container}>
        <View style={styles.itemData}>
          <Text style={styles.text}>{data.quantity}pc </Text>
          <Text style={styles.text}>{data.productTitle}</Text>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.text}>${data.sum} </Text>
          {deletable && <TouchableComponent onPress={props.onRemove} style={styles.deleteButton}>
            <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color={'red'}/>
          </TouchableComponent>}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: "#888",
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  },
});

export default CartItem;
