import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { verticalScale } from '../../Dimensions'
import { RupeeSymbol, universalPadding } from '../../config'
import Colors from '../../Colors'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/Store'

const SummaryItemCard = (data:any) => {
    const CartItem = data.data
    const quantity = useSelector((state: RootState) =>
        state.cart.items.find((item: any) => item.id === CartItem.id)?.quantity ?? 0
    )
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageArea}>
        <Image source={{uri: CartItem.image}} style={styles.Image}/>
      </View>
      <View style={styles.ItemDetailArea}>
        <Text style={styles.NameText}>{CartItem.name}</Text>
        <Text style={styles.SubText}>({CartItem.type})</Text>
        <Text style={styles.SubText}>Quantity: {quantity}</Text>
        <Text style={styles.PriceText}>{RupeeSymbol} {quantity*CartItem.price}</Text>
      </View>
    </View>
  )
}

export default SummaryItemCard

const styles = StyleSheet.create({
    MainContainer: {
        flexDirection:'row',
        height:verticalScale(80),
        borderRadius: verticalScale(10),
        borderColor:Colors.primaryText,
        margin:universalPadding,
        overflow:'hidden',
    },
    Image: {
        height:'100%',
        width:'100%',
    },
    ImageArea: {
        height: '100%',
        width: '35%',
        overflow:'hidden',
        borderRadius:verticalScale(10),
        resizeMode:'contain'
    },
    ItemDetailArea: {
        padding: universalPadding*0.5,
    },
    NameText: {
        fontSize:verticalScale(13),
        fontFamily:'Poppins-Medium',
        color:Colors.primaryText,
    },
    SubText: {
        fontSize:verticalScale(10),
        fontFamily:'Poppins-Medium',
        color:Colors.primaryText,
    },
    PriceText: {
        fontSize:verticalScale(11),
        fontFamily:'Poppins-Medium',
        color:'red',
        lineHeight:verticalScale(11)
    }
})