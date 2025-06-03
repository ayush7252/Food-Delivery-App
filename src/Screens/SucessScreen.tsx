import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../Colors';
import {verticalScale} from '../Dimensions';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, Congrats} from '../assets/Icons';
import {ConfirmationText, CongratsText, universalPadding} from '../config';
import SucessOrderCard from '../Components/Cards/SucessOrderCard';

const SucessScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.MainNavigation}>
      <View style={styles.HeaderArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.BackIcon} />
        </TouchableOpacity>
        <View style={styles.TitleArea}>
          <Text style={styles.TitleText}>{ConfirmationText}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.CongratsArea}>
          <Image source={Congrats} style={styles.CongratsIcon} />
          <Text style={styles.CongratsText}>{CongratsText}</Text>
        </View>
        <SucessOrderCard />
        <View style={styles.ButtonArea}>
            <TouchableOpacity style={styles.ExploreButtons}>
                <Text style={styles.ButtonText}>Back to home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ExploreButtons}>
                <Text style={styles.ButtonText}>Track order</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SucessScreen;

const styles = StyleSheet.create({
  MainNavigation: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  HeaderArea: {
    height: verticalScale(80),
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: verticalScale(1.5),
    borderEndEndRadius: verticalScale(90),
    borderColor: Colors.primaryText,
    flexDirection: 'row',
  },
  BackIcon: {
    height: verticalScale(20),
    width: verticalScale(20),
    top: universalPadding * 2.3,
    left: universalPadding,
    tintColor: Colors.primaryText,
  },
  TitleArea: {
    width: '85%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TitleText: {
    fontSize: verticalScale(20),
    fontFamily: 'Poppins-Medium',
  },
  CongratsArea: {
    height: verticalScale(50),
    margin: universalPadding,
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'space-between',
    paddingHorizontal: universalPadding,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: verticalScale(20),
    elevation: verticalScale(10),
  },
  CongratsIcon: {
    height: verticalScale(25),
    width: verticalScale(25),
  },
  CongratsText: {
    fontSize: verticalScale(9),
    fontFamily: 'Poppins-Medium',
    width: '88%',
  },
  ExploreButtons: {
    height:verticalScale(40),
    width:"40%",
    backgroundColor:Colors.primaryText,
    borderRadius:verticalScale(20),
    justifyContent:'center',
    alignItems:'center',
  },
  ButtonArea: {
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  ButtonText: {
    fontSize:verticalScale(11),
    fontFamily:'Poppins-Medium',
    color:Colors.backgroundPrimary
  }
});
