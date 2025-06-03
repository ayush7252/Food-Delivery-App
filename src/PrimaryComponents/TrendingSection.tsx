import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ResturantData from '../assets/ConstantsData/ResturantData.json'
import SecondaryCard from '../Components/Cards/ResturantCard'
import { ResturantTitle, universalPadding } from '../config'
import { verticalScale } from '../Dimensions'
import Colors from '../Colors'
import * as Animatable from 'react-native-animatable';
const TrendingSection = () => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.TitleTxtArea}>
        <Text style={styles.TitleTxt}>{ResturantTitle}</Text>
      </View>
      <ScrollView horizontal style={styles.Scroll} showsHorizontalScrollIndicator={false}>
        {ResturantData.map((item) => (
          <Animatable.View animation={'fadeInRight'} duration={1000} key={item.id}>
            <SecondaryCard data={item}/>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  )
}

export default TrendingSection;

const styles = StyleSheet.create({
    MainContainer: {
        marginHorizontal:universalPadding,
        marginVertical:universalPadding*0.5,
        height: verticalScale(190),
    },
    TitleTxtArea: {
        marginBlock:universalPadding*0.5,
    },
    TitleTxt: {
        fontSize:verticalScale(16),
        fontFamily:'Poppins-SemiBold',
        color:Colors.primaryText
    },
    Scroll: {
        marginHorizontal: verticalScale(-14),
    }
})