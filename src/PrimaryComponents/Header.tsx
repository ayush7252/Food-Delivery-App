import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {verticalScale, width} from '../Dimensions';
import Colors from '../Colors';
import {CartIcon, SearchIcon} from '../assets/Icons';
import {borderRadius, HelloTxt, Quote, universalPadding, UserName} from '../config';
import Card from '../Components/Cards/PrimaryCard';
import CardData from '../assets/ConstantsData/CardData.json'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.MainContainer}>

      <View style={styles.IconContainer}>
        <TouchableOpacity>
          <Image source={SearchIcon} style={styles.Icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('CartScreen')}}>
          <Image source={CartIcon} style={styles.Icon} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.TitleTxt}>
          {HelloTxt}, {UserName} !
        </Text>
        <View style={styles.QuoteArea}>
          <Text style={styles.Quote}>"{Quote}"</Text>
        </View>
      </View>

      <ScrollView horizontal style={styles.Scroll} showsHorizontalScrollIndicator={false}>
        {CardData.map((item) => (
          <Animatable.View animation={'fadeInRight'} duration={1000} key={item.id}>
            <Card data={item}/>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  MainContainer: {
    paddingTop: verticalScale(30),
    height: verticalScale(370),
    borderBottomEndRadius: verticalScale(90),
    width: '100%',
    backgroundColor: Colors.backgroundSecondary,
    padding: universalPadding,
  },
  Icon: {
    height: verticalScale(23),
    width: verticalScale(23),
    tintColor:'#2C3E50'
  },
  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:universalPadding
  },
  TitleTxt: {
    fontSize: verticalScale(40),
    paddingTop:universalPadding,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.primaryText,
  },
  QuoteArea: {
    alignItems:'center',
    marginBottom:verticalScale(10),
  },
  Quote: {
    fontSize:verticalScale(15),
    color:Colors.secondaryTxt,
    fontFamily:'Poppins-Light',
  },
  Scroll: {
    marginHorizontal: verticalScale(-14),
  }
});
