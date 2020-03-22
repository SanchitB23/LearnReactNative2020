import React, {useState} from 'react';
import {Button, Modal, StyleSheet, TextInput, View} from "react-native";

function GoalInput(props) {
  const {addGoal, onCancel} = props;
  const [enteredGoal, setEnteredGoal] = useState('');
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText)
  };

  function onAddHandler() {
    addGoal(enteredGoal);
    setEnteredGoal('')
  }

  return (
      <Modal visible={props.modalVisibility} animated={true} animationType="slide">
        <View style={styles.inputContainer}>
          <TextInput placeholder="Course Goal"
                     style={styles.textInputContainer} onChangeText={goalInputHandler} value={enteredGoal}/>
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title="Cancel" color="red" onPress={onCancel}/></View>
            <View style={styles.button}><Button title="Add" onPress={onAddHandler}/></View>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {justifyContent: "center", alignItems: "center", flex: 1},
  textInputContainer: {
    borderBottomColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    width: '80%',
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%"
  },
  button: {
    width: "40%",
  }
});
export default GoalInput;
