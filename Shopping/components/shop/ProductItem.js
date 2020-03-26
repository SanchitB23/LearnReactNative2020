import React from 'react';
import {Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import colors from "../../constants/colors";

const ProductItem = ({data, onViewDetails, onAddToCart}) => {
  const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
      <View style={styles.container}>
        <TouchableComponent onPress={onViewDetails} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{uri: data.imageUrl}} style={styles.image}/>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.price}>${data.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <Button color={colors.primary} title="View Details" onPress={onViewDetails}/>
              <Button color={colors.primary} title="Add to Cart" onPress={onAddToCart}/>
            </View>
          </View>
        </TouchableComponent>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  image: {
    width: '100%',
    height: "100%"
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  },
  detailContainer: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  }
});

export default ProductItem;
