import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
      <View style={styles.screen}>
        <Text style={styles.text}>
          {props.children}
        </Text>
      </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.accent,
    fontSize: 22
  }
});
export default NumberContainer;
