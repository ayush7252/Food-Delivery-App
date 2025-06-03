import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../Dimensions';
import Colors from '../Colors';
import {BackIcon, EditIcon} from '../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {DeliverToText, DeliveryCharges, DeliveryText, ItemText, PlatformFees, PlatformText, RupeeSymbol, SummaryText, TotalItemPriceText, TotalPriceText, universalPadding} from '../config';
import AddressCard from '../Components/Cards/AddressCard';
import { useSelector } from 'react-redux';
import {RootState} from '../Redux/Store';
import CartCard from '../Components/Cards/CartCard';
import SummaryItemCard from '../Components/Cards/SummaryItemCard';
import PayButton from '../Components/Buttons/PayButton';
const getTotalAmount = (items: any[]) =>
  items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);


const SummaryScreen = ({route}: any) => {
    
  const {address} = route.params;
  const navigation = useNavigation<any>();
  const CartItems = useSelector((state: RootState) => state.cart.items);
  const TotalAmount = getTotalAmount(CartItems);
  const FinalAmount = TotalAmount+PlatformFees + DeliveryCharges
  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.BackIcon} />
        </TouchableOpacity>
        <View style={styles.TitleArea}>
          <Text style={styles.TitleText}>{SummaryText}</Text>
        </View>
      </View>
      <ScrollView style={styles.ContentArea}>
        <View style={styles.AddressArea}>
            <Text style={styles.DeliveryText}>{DeliverToText}:-</Text>
            <AddressCard data={address} selected={true}/>
        </View>
        <View style={styles.ItemTextArea}>
            <Text style={styles.ItemText}>{ItemText}:-</Text>
            <TouchableOpacity style={styles.EditButton} onPress={()=>navigation.navigate('CartScreen')}>
                <Image source={EditIcon} style={styles.EditIcon}/>
            </TouchableOpacity>
        </View>
        <FlatList
        scrollEnabled={false}
        data={CartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=>(
            <SummaryItemCard data={item}/>
        )}
        ListFooterComponent={
            <View style={styles.ListFooter}></View>
        }
        />
        <View style={styles.PriceArea}>
            <Text style={styles.PriceText}>{TotalPriceText}:-</Text>
            <View style={styles.SubPrices}>
                <Text style={styles.SubPricesText}>{TotalItemPriceText} </Text>
                <Text style={styles.SubPricesText}>{RupeeSymbol} {TotalAmount}</Text>
            </View>
            <View style={styles.SubPrices}>
                <Text style={styles.SubPricesText}>{PlatformText} </Text>
                <Text style={styles.SubPricesText}>{RupeeSymbol} {PlatformFees}</Text>
            </View>
            <View style={styles.SubPrices}>
                <Text style={styles.SubPricesText}>{DeliveryText}</Text>
                <Text style={styles.SubPricesText}>{RupeeSymbol} {DeliveryCharges}</Text>
            </View>
            <View style={styles.TotalSubPrices}>
                <Text style={styles.TotalAmountText}>Total Amount</Text>
                <Text style={styles.TotalAmountText}>{RupeeSymbol} {FinalAmount}</Text>
            </View>
        </View>
      </ScrollView>
      <View style={styles.PayBtn}>
        <PayButton data={FinalAmount}/>
      </View>
    </View>
  );
};

export default SummaryScreen;

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
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Medium',
  },
  ContentArea: {
    paddingVertical: universalPadding
  },
  AddressArea: {
    height:verticalScale(150),
  },
  DeliveryText: {
    fontSize: verticalScale(13),
    fontFamily: 'Poppins-Medium',
    paddingHorizontal:universalPadding,
  },
  ListFooter: {
    margin:verticalScale(10)
  },
  EditIcon: {
    height:verticalScale(18),
    width:verticalScale(18),
    tintColor:Colors.primaryText
  },
  ItemText: {
    fontSize: verticalScale(13),
    fontFamily: 'Poppins-Medium',
    paddingHorizontal:universalPadding,
    paddingTop:universalPadding,
  },
  ItemTextArea: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:universalPadding*0.5,
    alignItems:'center',
  },
  EditButton: {
    padding:universalPadding*0.2,
    right:universalPadding,
    gap:verticalScale(6),
    justifyContent:'center',
    alignItems:'center',
    paddingTop:universalPadding,
  },
  PriceArea: {
    height:verticalScale(280),
    padding:universalPadding

  },
  PriceText: {
    fontSize:verticalScale(13),
    fontFamily:'Poppins-Medium',
    color:Colors.primaryText,
  },
  SubPrices: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:universalPadding*0.5,
    marginBlock:universalPadding*0.3
  },
  SubPricesText: {
    fontSize:verticalScale(11),
    color:Colors.thirdText,
    lineHeight:verticalScale(15),
    fontFamily:'Poppins-Medium'
  },
  TotalAmountText: {
    fontSize:verticalScale(13),
    color:Colors.thirdText,
    lineHeight:verticalScale(15),
    fontFamily:'Poppins-Medium'
  },
  TotalSubPrices: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:universalPadding*0.5,
    marginBlock:universalPadding*0.3,
    borderTopWidth:verticalScale(1),
    paddingTop:universalPadding*0.3
  },
  PayBtn: {
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    top:verticalScale(580),
  }
});
