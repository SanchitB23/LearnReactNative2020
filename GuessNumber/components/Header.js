import React from 'react';
import {Platform, StyleSheet, Text, View} from "react-native";
import colors from "../constants/colors";
import style from '../styles'

function Header(props) {
  return (
      <View style={styles.header}>
        <Text style={{...styles.headerTitle, ...style.title}}>{props.title}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? colors.primary : 'white',
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: Platform.OS === 'android' ? 0 : 2,
    borderBottomColor: Platform.OS === 'android' ? 'transparent' : '#ccc'
  },
  headerTitle: {
    height: 18,
    fontFamily: 'open-sans-bold',
    color: Platform.OS === 'android' ? 'white' : colors.primary
  }
});
export default Header;
