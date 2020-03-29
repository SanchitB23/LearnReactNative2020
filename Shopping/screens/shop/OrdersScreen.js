import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/layouts/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import {fetchOrders} from "../../store/actions";


export const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch]);

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
