import React from 'react';
import {Alert, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import colors from "../../constants/colors";
import {deleteProduct} from "../../store/actions";

const UserProductsScreen = (props) => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (productId) => {
    props.navigation.navigate('EditProduct', {productId})
  };

  const deleteHandler = (id) => {
    Alert.alert('Delete Product?', "Do you really want to delete this item?", [
      {text: 'NO', style: "default"},
      {
        text: 'YES', style: "destructive", onPress: () => dispatch(deleteProduct(id))
      }
    ])
  };

  return (
      <FlatList
          data={userProducts}
          renderItem={itemData =>
              <ProductItem data={itemData.item} onSelect={() => {
                editProductHandler(itemData.item.id)
              }}>
                <Button color={colors.primary} title="Edit"
                        onPress={() => editProductHandler(itemData.item.id)}/>
                <Button color={colors.primary} title="Delete"
                        onPress={deleteHandler.bind(this, itemData.item.id)}/>
              </ProductItem>
          }
      />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
        <HeaderButtons title={"NavDrawer"} HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName={"menu"} onPress={() => {
            navData.navigation.toggleDrawer()
          }}/>
        </HeaderButtons>
    ),
    headerRight: () => (<HeaderButtons title="Add new Product" HeaderButtonComponent={CustomHeaderButton}>
      <Item title="new Product" iconName={"create"} onPress={() => {
        navData.navigation.navigate('EditProduct')
      }}/>
    </HeaderButtons>)
  }
};

export default UserProductsScreen;

