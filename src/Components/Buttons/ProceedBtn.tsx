import React from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import {verticalScale} from '../../Dimensions';
import Colors from '../../Colors';
import {ProceedTxt} from '../../config';

type ProceedBtnProps = {
  selected?: boolean;
  onPress?: () => void;
};

const ProceedBtn = ({selected = false , onPress}: ProceedBtnProps) => {
    

  return (
    <TouchableOpacity
      style={styles.MainContainer}
      onPress={onPress}>
      <Text style={styles.Text}>{ProceedTxt}</Text>
    </TouchableOpacity>
  );
};

export default ProceedBtn;

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(56),
    width: '80%',
    alignSelf: 'center',
    borderRadius: verticalScale(28),
    backgroundColor: Colors.primaryText,
    elevation: 10,
    marginVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  Text: {
    color: Colors.backgroundPrimary,
    fontSize: verticalScale(16),
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.1,
  },
});
