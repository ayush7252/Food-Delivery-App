import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../Dimensions';
import {RupeeSymbol, universalPadding} from '../../config';
import Colors from '../../Colors';
import {Decrement, Delete, Increment} from '../../assets/Icons';
import {useDispatch} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../../Redux/Slices/CartSlice';

const CartCard = ({data}: any) => {
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(incrementQuantity(data.id));
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity(data.id));
  };
  const handleDelete = () => {
    dispatch(removeFromCart(data.id));
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageArea}>
        <Image source={{uri: data.image}} style={styles.Image} />
      </View>
      <View style={styles.ContentArea}>
        <Text style={styles.TitleName}>{data.name}</Text>
        <Text style={styles.subData}>( {data.type} )</Text>
        <Text style={styles.subDataPrice}>
          {RupeeSymbol} {data.price}{' '}
        </Text>
        <View style={styles.IncrementDeleteArea}>
          <View style={styles.IncrementSection}>
            <TouchableOpacity onPress={() => handleDecrement()}>
              <Image source={Decrement} style={styles.QuantityIcons} />
            </TouchableOpacity>
            <Text style={styles.Quantity}>{data.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement()}>
              <Image source={Increment} style={styles.QuantityIcons} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleDelete()}
            style={styles.DeleteArea}>
            <Image source={Delete} style={styles.DeleteIcons} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(110),
    margin: universalPadding,
    borderRadius: verticalScale(20),
    overflow: 'hidden',
    elevation:25,
    flexDirection: 'row',
    backgroundColor: Colors.backgroundPrimary,
  },
  ImageArea: {
    height: '100%',
    width: '40%',
    borderRadius: verticalScale(18),
    overflow: 'hidden',
  },
  Image: {
    height: '100%',
    width: '100%',
  },
  ContentArea: {
    padding: universalPadding,
  },
  TitleName: {
    fontSize: verticalScale(13),
    fontFamily: 'Poppins-Medium',
  },
  subData: {
    fontSize: verticalScale(10),
    fontFamily: 'Poppins-Medium',
  },
  subDataPrice: {
    fontSize: verticalScale(12),
    fontFamily: 'Poppins-SemiBold',
  },
  IncrementSection: {
    height: verticalScale(30),
    width: '50%',
    backgroundColor: Colors.backgroundSecondary,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius:verticalScale(8),
    alignItems:'center',
    borderWidth:verticalScale(1),
    borderColor:Colors.primaryText
  },
  DeleteArea: {
    height: verticalScale(30),
    width: '20%',
    backgroundColor: 'rgba(245, 12, 12, 0.25)',
    left: verticalScale(15),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:verticalScale(8),
    borderWidth:verticalScale(1),
    borderColor:'#f50c0c'
  },
  IncrementDeleteArea: {
    flexDirection: 'row',
  },
  QuantityIcons: {
    height: verticalScale(20),
    width: verticalScale(20),
    tintColor:Colors.primaryText
  },
  DeleteIcons: {
    height: verticalScale(19),
    width: verticalScale(19),
    tintColor:'#ff0303'
  },
  Quantity: {
    fontSize:verticalScale(16),
    fontFamily:'Poppins-Medium',
    paddingTop:verticalScale(2),
    color:Colors.primaryText,
  }
});
