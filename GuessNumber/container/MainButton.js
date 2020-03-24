import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../constants/colors";

const MainButton = (props) => {
  return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius:25
  },
  textStyle: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});
export default MainButton;
