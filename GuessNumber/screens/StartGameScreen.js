import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Card from "../container/Card";
import colors from "../constants/colors";
import Input from "../container/Input";
import NumberContainer from "../container/NumberContainer";
import style from '../styles'
import MainButton from "../container/MainButton";

const StartGameScreen = (props) => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false)
  };
  useEffect(() => {
    Dimensions.addEventListener("change", () => setButtonWidth(Dimensions.get('window').width / 4));
    return () => {
      Dimensions.removeEventListener("change", () => setButtonWidth(Dimensions.get('window').width / 4))
    }
  });
  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert('Invalid Number', "Number has to be between 1 and 99", [{
        text: 'Okay',
        style: 'destructive',
        onPress: resetInputHandler
      }]);
      return
    }
    setConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNum);
    Keyboard.dismiss()
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
        <Card style={styles.summaryCard}>
          <Text style={style.bodyText}>You Selected</Text>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton onPress={() => props.onStartGame(selectedNumber)}>
            Start Game
          </MainButton>
        </Card>
    )
  }
  return (
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
              <Text style={{...styles.title, ...style.bodyText}}>Start a New Game</Text>
              <Card style={styles.inputContainer}>
                <Text style={style.bodyText}>Select a Number</Text>
                <Input style={styles.input} keyboardType={"number-pad"} maxLength={2} onChangeText={numberInputHandler}
                       value={enteredValue}/>
                <View style={styles.buttonContainer}>
                  <View style={{width: buttonWidth}}><Button color={colors.accent} title="Reset"
                                                             onPress={resetInputHandler}/></View>
                  <View style={{width: buttonWidth}}><Button color={colors.primary} title="Confirm"
                                                             onPress={confirmInputHandler}/></View>
                </View>
              </Card>
              {confirmedOutput}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 15
  },
  inputContainer: {
    width: '80%',
    maxWidth: "95%",
    alignItems: 'center',
    minWidth: 300,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryCard: {
    marginTop: 20,
    alignItems: 'center'
  }
});
export default StartGameScreen;
