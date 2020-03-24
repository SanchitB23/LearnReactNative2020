import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import style from '../styles'
import colors from "../constants/colors";
import MainButton from "../container/MainButton";

const GameOverScreen = ({rounds, userNumber, onRestart}) => {
  return (
      <ScrollView>
        <View style={styles.screen}>
          <Text style={{...style.title, fontSize: 22}}>Game is Over!</Text>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/success.png')} fadeDuration={250}
                   style={styles.image}/>
          </View>
          <View style={styles.resultContainer}>
            <Text style={{...style.bodyText, ...styles.resultText}}>
              Your Phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number <Text
                style={styles.highlight}>{userNumber}</Text>
            </Text>
          </View>
          <MainButton onPress={onRestart}>New Game</MainButton>
        </View>
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    borderRadius: 150,
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get("window").height / 20,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 40
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get("window").height > 400 ? 20 : 16,
    marginVertical: 20
  }
});
export default GameOverScreen;
