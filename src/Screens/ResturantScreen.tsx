import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {verticalScale, width} from '../Dimensions';
import {BackIcon, Location} from '../assets/Icons';
import Colors from '../Colors';
import LinearGradient from 'react-native-linear-gradient';
import { universalPadding } from '../config';
import { useNavigation } from '@react-navigation/native';


const ResturantScreen = ({route}: any) => {
    const navigation = useNavigation();
  const data = route.params;
  return (
    <View style={styles.MainContainer}>
      <View style={styles.ImageArea}>
        <ImageBackground source={{uri:data.Image}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}>
            <View style={styles.ImageContent}>
              <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Image source={BackIcon} style={styles.BackButton} />
              </TouchableOpacity>
              <View>
                <Text style={styles.ResturantName}>{data.Name}</Text>
                <View style={styles.LocationArea}>
                    <Image source={Location} style={styles.LocationIcon}/>
                    <Text style={styles.LocationText}>{data.Location}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ResturantScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  ImageArea: {
    width: width,
    height: verticalScale(200),
    overflow: 'hidden',
    backgroundColor: 'red',
    borderBottomEndRadius: verticalScale(90),
  },
  BackButton: {
    height: verticalScale(25),
    width: verticalScale(25),
    top: verticalScale(12),
    tintColor: Colors.backgroundPrimary,
  },
  ImageContent: {
    height: '100%',
    justifyContent: 'space-between',
    padding:universalPadding,
  },
  ResturantName: {
    fontSize:verticalScale(20),
    color:Colors.backgroundPrimary,
    fontFamily:'Poppins-Medium'
  },
  LocationArea: {
    flexDirection:'row',
  },
  LocationIcon: {
    height:verticalScale(15),
    width:verticalScale(15),
    tintColor:Colors.cardBackground,
  },
  LocationText: {
    fontSize:verticalScale(11),
    color:Colors.cardBackground,
    fontFamily:'Poppins-Medium',
    left:verticalScale(7)
  }
});
