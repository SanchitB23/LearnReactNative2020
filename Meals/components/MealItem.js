import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DefaultText from "../containers/DefaultText";

const MealItem = ({data, onSelect}) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelect}>
        <View style={{...styles.mealRow, ...styles.mealHeader}}>
          <ImageBackground source={{uri: data.imageUrl}} style={styles.bgImage}>
            <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
          </ImageBackground>
        </View>
        <View style={{...styles.mealRow, ...styles.mealDetail}}>
          <DefaultText>{data.duration}m</DefaultText>
          <DefaultText>{data.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{data.affordability.toUpperCase()}</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  container: {
    height: 200, width: '100%', backgroundColor: "#f5f5f5",
    borderRadius: 10, overflow: 'hidden'
  },
  mealRow: {flexDirection: 'row'},
  mealDetail: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: "center"

  },
  mealHeader: {
    height: '85%'
  },
  bgImage: {
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default MealItem;
