import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../Dimensions';
import Colors from '../../Colors';
import {borderRadius, RupeeSymbol, universalPadding} from '../../config';
import {Rating} from 'react-native-ratings';
import {NonVegIcon, VegIcon} from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';


const FastMealCard = ({data}: any) => {
    const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.MainContainer} onPress={()=>{navigation.navigate('MealScreen' , data)}}>
      <View style={styles.ImageContainer}>
        <Image source={{uri: data.image}} style={styles.ItemImage} />
      </View>
      <View style={styles.ContentArea}>
        <Text style={styles.CardName} numberOfLines={1}>
          {data.name}
        </Text>
        <View style={styles.Ratings}>
          <Rating
            readonly
            startingValue={data.rating % 5}
            imageSize={13}
            tintColor={Colors.cardBackground}
            fractions={1}
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
        <View style={styles.PriceArea}>
          <Text style={styles.MealData}>
            {RupeeSymbol} {data.price}
          </Text>
          {data.type === 'veg' ? <Image source={VegIcon} style={styles.typeIcon} /> : <Image source={NonVegIcon} style={styles.typeIcon} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FastMealCard;

const styles = StyleSheet.create({
  MainContainer: {
    width: verticalScale(100),
    height: verticalScale(165),
    backgroundColor: Colors.cardBackground,
    borderRadius: borderRadius,
    marginHorizontal: universalPadding * 0.6,
  },
  ImageContainer: {
    width: '100%',
    height: verticalScale(90),
    borderRadius: borderRadius,
    overflow: 'hidden',
  },
  ItemImage: {
    height: '100%',
    width: '100%',
  },
  CardName: {
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(10),
  },
  ContentArea: {
    padding: universalPadding * 0.5,
  },
  Ratings: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    marginBlock: universalPadding * 0.3,
  },
  MealData: {
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(13),
    color: Colors.primaryText,
    lineHeight: verticalScale(13),
  },
  typeIcon: {
    height: verticalScale(17),
    width: verticalScale(17),
  },
  PriceArea: {
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
