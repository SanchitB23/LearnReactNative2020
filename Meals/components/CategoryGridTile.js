import React from 'react';
import {Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';

const CategoryGridTile = ({itemData, onSelect}) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) TouchableComponent = TouchableNativeFeedback;

  return (
      <View style={styles.gridItem}>
        <TouchableComponent onPress={onSelect} style={{flex: 1}}>
          <View style={{...styles.container, ...{backgroundColor: itemData.item.color}}}>
            <Text style={styles.title} numberOfLines={2}>
              {itemData.item.title}
            </Text>
          </View>
        </TouchableComponent>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    shadowOpacity: 0.26,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    // overflow: 'hidden'
  }
});
export default CategoryGridTile;
