import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from "react-native-paper";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, updateProduct} from "../../store/actions";
import colors from "../../constants/colors";


function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      const updatedValues = {
        ...state.inputValues,
        [action.inputIdentifier]: action.value
      };
      const updatedInputValidities = {
        ...state.inputValidities,
        [action.inputIdentifier]: action.isValid
      };
      let formIsValid = true;
      for (const key in updatedInputValidities) {
        if (updatedInputValidities.hasOwnProperty(key))
          formIsValid = formIsValid && updatedInputValidities[key]
      }
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedInputValidities,
        formIsValid
      };
    default:
      return state
  }
}

const EditProductsScreen = (props) => {
  const prodId = props.navigation.getParam('productId');
  const [loading, setLoading] = useState(false);
  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? editedProduct.price : '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      price: !!editedProduct,
      description: !!editedProduct,
    },
    formIsValid: !!editedProduct
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input');
      return
    }

    const {title, description, price, imageUrl} = formState.inputValues;
    setLoading(true);

    if (editedProduct) {
      await dispatch(updateProduct(prodId, title, imageUrl, description))
    } else
      await dispatch(createProduct(title, imageUrl, +price, description));

    setLoading(false);
    props.navigation.goBack()
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0)
      isValid = true;
    dispatchFormState({type: 'UPDATE', value: text, isValid, input: 'title', inputIdentifier})
  };
  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={colors.primary}/> </View>
  }

  return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={{flex: 1}}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput mode="outlined" style={styles.input} label="Title" value={formState.inputValues.title}
                         onChangeText={textChangeHandler.bind(this, 'title')} autoCapitalize='sentences'
                         autoCorrent={true}
                         returnKeyType={'next'}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput mode="outlined" style={styles.input} label="Image URL" value={formState.inputValues.imageUrl}
                         onChangeText={textChangeHandler.bind(this, 'imageUrl')} returnKeyType={'next'}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput mode="outlined" style={styles.input} label="Price"
                         value={formState.inputValues.price.toString()}
                         editable={!editedProduct}
                         onChangeText={textChangeHandler.bind(this, 'price')} keyboardType="numeric"
                         returnKeyType={'next'}/>
            </View>
            <View style={styles.inputContainer}>
              <TextInput mode="outlined" style={styles.input} label="Description"
                         value={formState.inputValues.description}
                         returnKeyType={'next'} onChangeText={textChangeHandler.bind(this, 'description')}
                         autoCapitalize='sentences'
                         autoCorrent={true}/>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

EditProductsScreen.navigationOptions = (navData) => {
  const submitAction = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId') ? "Edit Product" : "Add Product",
    headerRight: () => (<HeaderButtons title="Add new Product" HeaderButtonComponent={CustomHeaderButton}>
      <Item title="new Product" iconName={"done"} onPress={submitAction}/>
    </HeaderButtons>)
  }
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  inputContainer: {
    width: '100%'
  },
  input: {
    paddingHorizontal: 2,
    marginVertical: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default EditProductsScreen;
