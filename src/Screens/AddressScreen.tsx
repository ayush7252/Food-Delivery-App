import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../Colors';
import {verticalScale} from '../Dimensions';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../assets/Icons';
import {AddressTitle, EmptyAddress, universalPadding} from '../config';
import AddAddressBtn from '../Components/Buttons/AddAddressBtn';
import {useSelector} from 'react-redux';
import {RootState} from '../Redux/Store';
import AddressCard from '../Components/Cards/AddressCard';
import ProceedBtn from '../Components/Buttons/ProceedBtn';

type Address = {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
};

const AddressScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const addresses = useSelector(
    (state: RootState) => state.address.addresses,
  ) as Address[];

  return (
    <View style={styles.MainContainer}>
      <View style={styles.HeaderArea}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackIcon} style={styles.BackIcon} />
        </TouchableOpacity>
        <View style={styles.TitleArea}>
          <Text style={styles.TitleText}>{AddressTitle}</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'height'}
        keyboardVerticalOffset={verticalScale(20)}>
        <ScrollView>
          <AddAddressBtn />
          <FlatList
            scrollEnabled={false}
            data={addresses}
            renderItem={({item, index}) => (
              <AddressCard
                data={item}
                selected={index === selectedIndex}
                onPress={() => setSelectedIndex(index)}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{EmptyAddress}</Text>
            }
          />
        </ScrollView>
        <View style={styles.ProceedBtnArea}>
          <ProceedBtn
            selected={selectedIndex !== null}
            onPress={() => {
              if (selectedIndex !== null) {
                const selectedAddress = addresses[selectedIndex];
                navigation.navigate('SummaryScreen', {
                  address: selectedAddress,
                });
              } else {
                ToastAndroid.show(
                  'Please select an address to proceed',
                  ToastAndroid.SHORT,
                );
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  HeaderArea: {
    flexDirection: 'row',
    height: verticalScale(80),
    backgroundColor: Colors.backgroundSecondary,
    borderBottomEndRadius: verticalScale(70),
    borderWidth: verticalScale(2),
    borderColor: Colors.primaryText,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primaryText,
    fontFamily: 'Poppins-Regular',
    opacity: 0.7,
  },
  ProceedBtnArea: {
    position: 'absolute',
    top: verticalScale(520),
    width: '100%',
    height: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
