import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../Colors';
import {height, verticalScale, width} from '../Dimensions';
import {
  BackIcon,
  NonVegIcon,
  VegIcon,
  wishlist,
  wishlistAdded,
} from '../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {AddToCart, GoToCart, universalPadding} from '../config';
import {Rating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../Redux/Slices/CartSlice';
import {RootState} from '../Redux/Store';

const MealScreen = ({route}: any) => {
  const [wishListVisible, setwishListVisible] = useState(false);
  const [cartAddedAnim, setCartAddedAnim] = useState(false);
  const navigation = useNavigation<any>();
  const data = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === data.id);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart(data));
      setCartAddedAnim(true);
      timerRef.current = setTimeout(() => {
        setCartAddedAnim(false);
      }, 1200);
    } else {
      navigation.navigate('CartScreen');
    }
  };
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageArea}>
        <ImageBackground source={{uri: data.image}} style={styles.MealImage}>
          <View style={styles.IconsPosition}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={BackIcon} style={styles.BackIcon} />
            </TouchableOpacity>
            {data.type === 'veg' ? (
              <Image source={VegIcon} style={styles.IconType} />
            ) : (
              <Image source={NonVegIcon} style={styles.IconType} />
            )}
          </View>
        </ImageBackground>
      </View>
      <View style={styles.ContentArea}>
        <View style={styles.MealNameArea}>
          <Text style={styles.MealName}>{data.name}</Text>
          <Rating
            readonly
            startingValue={data.rating % 5}
            imageSize={30}
            tintColor={Colors.cardBackground}
            style={styles.Ratings}
          />
          <Text style={styles.MiniText}>{data.rating}</Text>
        </View>
        <View>
          <Text style={styles.SubText}>{data.description}</Text>
        </View>
      </View>
      <View style={styles.ButtonArea}>
        <TouchableOpacity
          style={[
            styles.CartButton,
            (cartAddedAnim || isInCart) && {backgroundColor: '#4CAF50'},
          ]}
          onPress={handleAddToCart}
          disabled={cartAddedAnim}>
          <Text
            style={[
              styles.CartText,
              (cartAddedAnim || isInCart) && {color: '#fff'},
            ]}>
            {cartAddedAnim ? 'Cart Added!' : isInCart ? GoToCart : AddToCart}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setwishListVisible(!wishListVisible);
          }}
          style={styles.WishlistButton}>
          {wishListVisible ? (
            <Image source={wishlistAdded} style={styles.wishlistIcon} />
          ) : (
            <Image source={wishlist} style={styles.wishlistIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MealScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
  },
  MealImage: {
    height: '100%',
    width: '100%',
  },
  ImageArea: {
    height: '55%',
    width: '100%',
    borderBottomLeftRadius: verticalScale(160),
    overflow: 'hidden',
  },
  BackIcon: {
    height: verticalScale(25),
    width: verticalScale(25),
    tintColor: Colors.backgroundPrimary,
    top: verticalScale(20),
    left: verticalScale(10),
  },
  IconsPosition: {
    height: '100%',
    justifyContent: 'space-between',
  },
  IconType: {
    height: verticalScale(25),
    width: verticalScale(25),
    bottom: verticalScale(15),
    left: verticalScale(250),
  },
  ContentArea: {
    padding: universalPadding,
  },
  MealNameArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBlock: universalPadding,
  },
  MealName: {
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primaryText,
  },
  Ratings: {
    backgroundColor: 'transparent',
  },
  MiniText: {
    fontSize: verticalScale(12),
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primaryText,
  },
  SubText: {
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Medium',
    color: Colors.primaryText,
  },
  ButtonArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  WishlistButton: {
    backgroundColor: Colors.backgroundSecondary,
    height: verticalScale(45),
    width: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(50),
    borderWidth: verticalScale(1),
  },
  wishlistIcon: {
    height: verticalScale(25),
    width: verticalScale(25),
    tintColor: Colors.primaryText,
  },
  CartButton: {
    height: verticalScale(45),
    width: verticalScale(135),
    tintColor: Colors.primaryText,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(50),
    borderWidth: verticalScale(1),
  },
  CartText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: verticalScale(13),
  },
});
