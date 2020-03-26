import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from "react-native-paper";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import {createProduct, updateProduct} from "../../store/actions";

const EditProductsScreen = (props) => {
  const prodId = props.navigation.getParam('productId');

  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
  const dispatch = useDispatch();
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, imageUrl, description))
    } else
      dispatch(createProduct(title, imageUrl, +price, description));
    props.navigation.goBack()
  }, [dispatch, prodId, title, price, imageUrl, description]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler]);

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput mode="outlined" style={styles.input} label="Title" value={title}
                       onChangeText={(text) => setTitle(text)}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput mode="outlined" style={styles.input} label="Image URL" value={imageUrl}
                       onChangeText={(text) => setImageUrl(text)}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput mode="outlined" style={styles.input} label="Price" value={price.toString()}
                       editable={!editedProduct}
                       onChangeText={(text) => setPrice(text)} keyboardType="numeric"/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput mode="outlined" style={styles.input} label="Description" value={description}
                       onChangeText={(text) => setDescription(text)}/>
          </View>
        </View>
      </ScrollView>
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
  }
});
export default EditProductsScreen;
