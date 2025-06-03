import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {verticalScale} from '../../Dimensions';
import Colors from '../../Colors';
import {borderRadius} from '../../config';
import {useNavigation} from '@react-navigation/native';

type CardProps = {
  data: {
    id: number;
    name: string;
    Image: string;
  };
};

const Card = (data: CardProps) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      style={styles.MainContainer}
      onPress={() => {
        navigation.navigate('CategoryScreen', data.data);
      }}>
      <ImageBackground source={{uri: data.data.Image}} style={styles.Image} />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Colors.backgroundPrimary,
    height: verticalScale(80),
    width: verticalScale(100),
    borderRadius: borderRadius,
    margin: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: '100%',
    width: '100%',
  },
});
