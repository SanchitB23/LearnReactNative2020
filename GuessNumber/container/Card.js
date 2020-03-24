import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = (props) => (
    <View style={{...styles.screen, ...props.style}}>
      {props.children}
    </View>
);

const styles = StyleSheet.create({
  screen: {
    shadowColor: "black", //ios shadow
    shadowOffset: {width: 0, height: 2}, //ios shadow
    shadowOpacity: 0.26, //ios shadow
    shadowRadius: 6, //ios shadow
    backgroundColor: 'white',
    elevation: 5, //android shadow
    padding: 20,
    borderRadius: 10
  }
});
export default Card;
