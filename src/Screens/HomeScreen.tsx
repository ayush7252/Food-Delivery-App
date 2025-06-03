import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../PrimaryComponents/Header';
import Colors from '../Colors';
import TrendingSection from '../PrimaryComponents/TrendingSection';
import FastMealSection from '../PrimaryComponents/FastMealSection';
import MenuButton from '../Components/Buttons/MenuButton';
import { verticalScale } from '../Dimensions';

const HomeScreen = () => {
  return (
    <View>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.backgroundSecondary}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <FastMealSection/>
        <TrendingSection />
      </ScrollView>
      <View style={styles.MenuButton}>
        <MenuButton/>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  MenuButton: {
    position:'absolute',
    top: verticalScale(590),
    left: verticalScale(230)
  }
});
