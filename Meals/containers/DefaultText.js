import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default (props) => {
  return <Text style={{...styles.container, ...props.style}}>{props.children}</Text>
}
const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans'
  }
});
