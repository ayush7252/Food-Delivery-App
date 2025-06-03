import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import {height, verticalScale} from '../Dimensions';
import Colors from '../Colors';
import {BackIcon} from '../assets/Icons';
import {CartEmptyText, CartTitle, universalPadding} from '../config';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/Store';
import CartCard from '../Components/Cards/CartCard';
import CartCheckoutBtn from '../Components/Buttons/CartCheckoutBtn';

const CartScreen = () => {
  const navigation = useNavigation<any>();
  const CartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.BackIcon} />
        </TouchableOpacity>
        <View style={styles.TitleArea}>
          <Text style={styles.TitleText}>{CartTitle}</Text>
        </View>
      </View>
      <View style={styles.ListArea}>
        <FlatList
          data={CartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CartCard data={item} />}
          contentContainerStyle={{paddingBottom: 16}}
          ListEmptyComponent={
            <Text style={styles.EmptyText}>{CartEmptyText}</Text>
          }
          ListFooterComponent={
            <View style={styles.ListFooter} />
          }
        />
      </View>
      <View style={styles.CheckoutBtnArea}>
        <CartCheckoutBtn />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  HeaderArea: {
    flexDirection: 'row',
    height: verticalScale(80),
    backgroundColor: Colors.backgroundSecondary,
    borderBottomEndRadius: verticalScale(70),
    borderWidth: verticalScale(2),
    borderColor: Colors.primaryText,
  },
  BackIcon: {
    height: verticalScale(20),
    width: verticalScale(20),
    top: universalPadding * 2.3,
    left: universalPadding,
    tintColor: Colors.primaryText,
  },
  TitleArea: {
    width: '85%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: verticalScale(25),
    fontFamily: 'Poppins-Medium',
  },
  ListArea: {
    marginTop: universalPadding,
  },
  EmptyText: {
    fontSize: verticalScale(18),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: height * 0.3,
    color: Colors.primaryText,
  },
  CheckoutBtnArea: {
    position: 'absolute',
    bottom: verticalScale(30),
    width: '100%',
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListFooter: {
    height: verticalScale(160),
  },
});
