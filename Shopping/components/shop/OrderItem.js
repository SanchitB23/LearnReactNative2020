import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import colors from "../../constants/colors";
import CartItem from "./CartItem";

const OrderItem = ({data}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
      <View style={styles.container}>
        <View style={styles.summary}>
          <Text style={styles.text}>${data.totalAmount.toFixed(2)}</Text>
          <Text style={styles.text}>{data.date}</Text>
        </View>
        <Button title={`${!showDetails ? 'Show' : 'Hide'} Details`}
                onPress={() => setShowDetails(prevState => !prevState)} color={colors.primary}/>
        {showDetails && <View style={styles.detailItems}>
          {data.items.map(cartItem => <CartItem key={cartItem.productId} data={cartItem} deletable/>)}
        </View>}
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    alignItems: "center",
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: '100%',
    margin: 15
  },
  text: {
    fontSize: 16
  },
  detailItems: {
    width: '100%'
  }
});
export default OrderItem;
