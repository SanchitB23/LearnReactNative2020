import React, {useCallback, useReducer, useState} from 'react';
import {Button, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';

import Input from '../../components/layouts/Input';
import Card from '../../components/layouts/Card';
import Colors from '../../constants/colors';
import {login, signUp} from '../../store/actions';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      if (updatedValidities.hasOwnProperty(key))
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    let action;
    if (isSignUp)
      action = signUp(
          formState.inputValues.email,
          formState.inputValues.password
      );
    else
      action = login(
          formState.inputValues.email,
          formState.inputValues.password
      );
    await dispatch(action);
    props.navigation.navigate('Shop')
  };

  const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier
        });
      },
      [dispatchFormState]
  );

  return (
      <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}
      >
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                  id="email"
                  label="E-Mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid email address."
                  onInputChange={inputChangeHandler}
                  initialValue=""
              />
              <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid password."
                  onInputChange={inputChangeHandler}
                  initialValue=""
              />
              <View style={styles.buttonContainer}>
                <Button
                    title={isSignUp ? "Sign Up" : "Login"}
                    color={Colors.primary}
                    onPress={authHandler}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                    title={!isSignUp ? "Switch to Sign Up" : "Switch to Login"}
                    color={Colors.accent}
                    onPress={() => setIsSignUp(state => !state)}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
