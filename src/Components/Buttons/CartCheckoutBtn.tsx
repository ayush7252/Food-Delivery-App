import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {verticalScale} from '../../Dimensions';
import {RootState} from '../../Redux/Store';
import Colors from '../../Colors';
import { useNavigation } from '@react-navigation/native';
import { CartCheckoutText } from '../../config';

const getTotalAmount = (items: any[]) =>
  items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

const CartCheckoutBtn = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = getTotalAmount(cartItems);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevAmount = useRef(totalAmount);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (prevAmount.current !== totalAmount) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
      prevAmount.current = totalAmount;
    }
  }, [totalAmount, scaleAnim]);

  return (
    <Animated.View
      style={[styles.MainContainer, {transform: [{scale: scaleAnim}]}]}>
      <TouchableOpacity
        style={styles.Touchable}
        onPress={()=>{navigation.navigate('AddressScreen')}}
        activeOpacity={0.8}>
        <Text style={styles.Text}>
          {CartCheckoutText} •{' '}
          <Text style={styles.Amount}>₹{totalAmount.toFixed(2)}</Text>
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CartCheckoutBtn;

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(56),
    width: '80%',
    alignSelf: 'center',
    borderRadius: verticalScale(28),
    backgroundColor: Colors.primaryText, 
    elevation: 10,
    marginVertical: verticalScale(10),
  },
  Touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(28),
  },
  Text: {
    color: Colors.backgroundPrimary,
    fontSize: verticalScale(16),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.1,
  },
  Amount: {
    color: Colors.backgroundSecondary,
    fontFamily: 'Poppins-Bold',
  },
});
