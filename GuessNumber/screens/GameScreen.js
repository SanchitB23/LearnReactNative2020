import React, {useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import NumberContainer from "../container/NumberContainer";
import Card from "../container/Card";
import style from '../styles'
import MainButton from "../container/MainButton";
import {Ionicons} from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  return rndNum
};
const renderListItem = (value, numberOfRound) => (
    <View key={value} style={styles.listItem}>
      <Text style={style.bodyText}>#{numberOfRound}</Text>
      <Text>{value}</Text>
    </View>
);

const GameScreen = ({userChoice, onGameOver}) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuess, setPastGuess] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuess.length)
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if ((direction < 0 && currentGuess < userChoice) || (direction > 0 && currentGuess > userChoice)) {
      Alert.alert('Don\'t trick me!', 'You know that this is wrong', [{text: 'Sorry!', style: 'cancel'}]);
      return
    }
    if (direction < 0) currentHigh.current = currentGuess;
    else currentLow.current = currentGuess + 1;
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(currRounds => currRounds + 1);
    setPastGuess(currPG => [nextNumber, ...currPG])
  };

  return (
      <View style={styles.screen}>
        <Text style={style.bodyText}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, -1)}><Ionicons name="md-remove" size={24}/></MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 1)}><Ionicons name="md-add" size={24}/></MainButton>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.scrollList}>
            {pastGuess.map((guess, index) => renderListItem(guess, pastGuess.length - index))}
          </ScrollView>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  },
  listContainer: {
    width: '80%',
    flex: 1,
  },
  scrollList: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  }
});
export default GameScreen;
