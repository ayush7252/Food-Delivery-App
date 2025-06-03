import { Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {moderateScale, verticalScale} from '../Dimensions';
import Colors from '../Colors';
import * as Animatable from 'react-native-animatable';
import {Logo} from '../assets/Icons';

import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

type Navigation = {
  navigation: StackNavigationProp<any>;
};

const SplashScreen = ({navigation}: Navigation) => {
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.replace('HomeScreen');
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Top_Container}>
        <Animatable.View animation={'fadeInUp'} duration={2000}>
          <Image source={Logo} style={styles.Logo} resizeMode="contain" />
        </Animatable.View>
      </View>
      <View style={styles.Bottom_Container}>
        {IsLoading && (
          // <ActivityIndicator size="large" color={Colors.textPrimary} />
          <LottieView 
          source={require('../assets/ConstantsData/Loader.json')}
          autoPlay
          loop
          style={styles.Loader}
          />
        )}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPrimary,
  },
  Top_Container: {
    width: moderateScale(300),
    height: verticalScale(300),
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Bottom_Container: {
    width: moderateScale(300),
    height: verticalScale(150),
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: moderateScale(200),
    height: verticalScale(200),
    backgroundColor: Colors.backgroundPrimary,
  },
  Loader: {
    height:verticalScale(60),
    width:verticalScale(60),
  }
});
