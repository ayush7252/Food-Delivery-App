import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FastMealTitle, universalPadding } from '../config'
import { verticalScale } from '../Dimensions'
import FastMealCard from '../Components/Cards/FastMealCard'
import FastMeals from '../assets/ConstantsData/FastMeals.json'
import * as Animatable from 'react-native-animatable'
import Colors from '../Colors'

const FastMealSection = () => {
  return (
    <View style={styles.MainContainer}>
      <View style={styles.TitleTxtArea}>
        <Text style={styles.TitleTxt}>{FastMealTitle}</Text>
      </View>
      <ScrollView horizontal style={styles.Scroll} showsHorizontalScrollIndicator={false}>
        {FastMeals.map((item)=>(
            <Animatable.View animation={'fadeInDown'} duration={1000} key={item.id}>
            <FastMealCard data={item}/>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  )
}

export default FastMealSection

const styles = StyleSheet.create({
    MainContainer: {
        marginHorizontal:universalPadding,
        marginVertical:universalPadding*0.5,
        height: verticalScale(220),
    },
    TitleTxtArea: {
        marginBlock:universalPadding*0.5,
    },
    TitleTxt: {
        fontSize:verticalScale(16),
        fontFamily:'Poppins-SemiBold',
        color: Colors.primaryText
    },
    Scroll: {
        marginHorizontal: verticalScale(-14),
    }
})