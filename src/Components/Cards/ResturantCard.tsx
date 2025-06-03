import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {verticalScale, width} from '../../Dimensions';
import {borderRadius, universalPadding} from '../../config';
import Colors from '../../Colors';
import LinearGradient from 'react-native-linear-gradient';
import {Location} from '../../assets/Icons';
import { useNavigation } from '@react-navigation/native';


const SecondaryCard = ({data}: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity style={styles.MainContainer} onPress={()=>{navigation.navigate("resturantScreen" , data)}}>
      <ImageBackground source={{uri: data.Image}} style={styles.BackgroundImg}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,1)']}
          style={styles.Gradient}>
          <View style={styles.ContentArea}>
            <View>
                <Text style={styles.Name}>{data.Name}</Text>
            </View>
            <View style={styles.TextAlignment}>
              <Image source={Location} style={styles.Icon} />
              <Text style={styles.LocationTxt}>{data.Location}</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default SecondaryCard;

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(120),
    width: width * 0.9,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: borderRadius,
    marginHorizontal: universalPadding,
    overflow: 'hidden',
  },
  BackgroundImg: {
    width: '100%',
    height: '100%',
  },
  Gradient: {
    flex: 1,
  },
  Icon: {
    height: verticalScale(15),
    width: verticalScale(15),
    tintColor: Colors.backgroundPrimary,
  },
  ContentArea: {
    top: verticalScale(65),
    left: verticalScale(20),
  },
  TextAlignment: {
    flexDirection: 'row',
  },
  LocationTxt: {
    color: Colors.backgroundPrimary,
    left: verticalScale(10),
    fontFamily:'Poppins-Medium'
  },
  Name: {
    fontSize:verticalScale(15),
    color:Colors.backgroundPrimary,
    fontFamily:'Poppins-Medium'
  }
});
