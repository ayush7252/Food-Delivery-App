import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/Store';
import {verticalScale} from '../../Dimensions';
import {ArrivingText, OrderIDText, PlacedOnText, RupeeSymbol, TotalAmountText, universalPadding} from '../../config';
import Colors from '../../Colors';
const SucessOrderCard = () => {
  const now = new Date();
  const orderNumber = useMemo(
    () => Math.floor(1000 + Math.random() * 9000),
    [],
  );
  const CartItems = useSelector((state: RootState) => state.cart.items);

  const getTotalAmount = (items: any[]) =>
    items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalAmount = getTotalAmount(CartItems);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.TopPortion}>
        <Text style={styles.OrderIDText}>{OrderIDText} : {orderNumber}</Text>
        <View style={styles.TimeArea}>
          <Text style={styles.ArrivingText}>{ArrivingText}</Text>
        </View>
      </View>
      <View style={{marginVertical: 8}}>
        <Text style={styles.SubText}>Items:</Text>
        {CartItems && CartItems.length > 0
          ? CartItems.map((item, idx) => (
              <Text key={idx} style={styles.ItemText}>
                - {item.name} x {item.quantity}
              </Text>
            ))
          : null}
      </View>

      <Text style={styles.SubText}>{PlacedOnText} : {now.toLocaleString()} </Text>
      <Text style={styles.SubText}>{TotalAmountText} : {RupeeSymbol} {totalAmount}</Text>
    </View>
  );
};

export default SucessOrderCard;

const styles = StyleSheet.create({
  MainContainer: {
    padding: universalPadding * 0.7,
    backgroundColor: Colors.backgroundSecondary,
    margin: universalPadding,
    borderRadius: verticalScale(20),
    borderWidth: verticalScale(1),
    borderColor: Colors.primaryText,
  },
  TopPortion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TimeArea: {
    height: verticalScale(25),
    width: verticalScale(90),
    backgroundColor: 'green',
    borderRadius: verticalScale(8),
    marginTop: verticalScale(-23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ArrivingText: {
    fontSize: verticalScale(8),
    fontFamily: 'Poppins-Medium',
    color: Colors.backgroundPrimary,
  },
  OrderIDText: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.thirdText,
  },
  SubText: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Medium',
    color: Colors.primaryText,
  },
  ItemText: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Regular',
    color: Colors.primaryText,
    marginLeft: 8,
  },
  AddressText: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Regular',
    color: Colors.primaryText,
    marginLeft: 8,
  },
});
