import React, {useEffect} from 'react';
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from 'react-native';
import colors from "../constants/colors";
import {useDispatch} from "react-redux";
import {authenticate} from "../store/actions";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expiration = new Date(expiryDate);
      if (expiration <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      const expiresIn = expiration.getTime() - new Date().getTime();
      props.navigation.navigate('Shop');
      dispatch(authenticate(token, userId, expiresIn))
    };
    tryLogin()
  }, [dispatch]);
  return (
      <View style={styles.container}>
        <ActivityIndicator style='large' color={colors.primary}/>
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default StartupScreen;
