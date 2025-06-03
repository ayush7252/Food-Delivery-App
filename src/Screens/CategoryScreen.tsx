import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-animatable';
import {BackIcon} from '../assets/Icons';
import {verticalScale, width} from '../Dimensions';
import Colors from '../Colors';
import {universalPadding} from '../config';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const CategoryScreen = ({route}: any) => {
    const navigation = useNavigation();
  const data = route.params;
  return (
    <View style={styles.MainContainer}>
      <ImageBackground source={{uri: data.Image}} style={styles.imageArea}>
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
         >
        <View style={styles.ImageContent}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image source={BackIcon} style={styles.BackButton} />
          </TouchableOpacity>
          <View style={styles.TitleArea}>
            <Text style={styles.TitleName}>{data.name}</Text>
          </View>
        </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  imageArea: {
    height: verticalScale(180),
    width: width,
    overflow: 'hidden',
    backgroundColor: 'red',
    borderBottomEndRadius: verticalScale(90),
  },
  BackButton: {
    height: verticalScale(20),
    width: verticalScale(20),
    tintColor: Colors.backgroundPrimary,
    left: universalPadding,
    top: universalPadding
  },
  ImageContent: {
    height:'100%',
    justifyContent:'space-between',
    paddingBlock:universalPadding,
  },
  TitleArea: {
    alignItems:'center',
  },
  TitleName: {
    fontFamily: 'Poppins-Medium',
    fontSize : verticalScale(25),
    color:Colors.backgroundPrimary,
  },
});
