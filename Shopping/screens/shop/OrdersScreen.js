import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";


export const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
  return <FlatList data={orders}
                   renderItem={itemData => <OrderItem data={itemData.item}/>}
                   keyExtractor={item => item.productId}
  />
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
        <HeaderButtons title={"NavDrawer"} HeaderButtonComponent={CustomHeaderButton}>
          <Item title="Menu" iconName={"menu"} onPress={() => {
            navData.navigation.toggleDrawer()
          }}/>
        </HeaderButtons>
    )
  }
};
