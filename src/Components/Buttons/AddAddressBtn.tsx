import React, {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Colors from '../../Colors';
import {verticalScale} from '../../Dimensions';
import {addAddress} from '../../Redux/Slices/AddressSlice';
import {useDispatch} from 'react-redux';
import { AddAddressText } from '../../config';

const initialForm = {
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
};

const FORM_HEIGHT = verticalScale(400);

const AddAddressBtn = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);

  const animHeight = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;
  const animTranslate = useRef(new Animated.Value(20)).current;

  const handleInput = (field: string, value: string) => {
    setForm(prev => ({...prev, [field]: value}));
  };

  const openForm = () => {
    setExpanded(true);
    Animated.parallel([
      Animated.timing(animHeight, {
        toValue: FORM_HEIGHT,
        duration: 350,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
      Animated.timing(animOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animTranslate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeForm = () => {
    Animated.parallel([
      Animated.timing(animOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(animTranslate, {
        toValue: 20,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start(() => {
      setExpanded(false);
      setForm(initialForm);
      setError('');
    });
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.line1 ||
      !form.city ||
      !form.state ||
      !form.zip
    ) {
      setError('Please fill all required fields.');
      return;
    }
    dispatch(addAddress(form));
    setAddressAdded(true);
    closeForm();
    setTimeout(() => setAddressAdded(false), 1500);
  };

  return (
    <View style={styles.AddNewAddressArea}>
      <TouchableOpacity
        style={styles.AddNewButton}
        onPress={expanded ? closeForm : openForm}
        activeOpacity={0.8}>
        <Text style={styles.AddNewButtonText}>{AddAddressText}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.FormAnimatedContainer,
          {
            height: animHeight,
            opacity: animOpacity,
            transform: [{translateY: animTranslate}],
          },
        ]}>
        {expanded && (
          <View style={styles.FormArea}>
            <View style={styles.FloatingLabelInput}>
              <Text style={styles.Label}>Full Name*</Text>
              <TextInput
                style={styles.Input}
                value={form.name}
                onChangeText={val => handleInput('name', val)}
                placeholder="Enter name"
                placeholderTextColor="#aaa"
                returnKeyType="next"
              />
            </View>
            <View style={styles.FloatingLabelInput}>
              <Text style={styles.Label}>Phone*</Text>
              <TextInput
                style={styles.Input}
                value={form.phone}
                onChangeText={val => handleInput('phone', val)}
                placeholder="Enter phone"
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
            <View style={styles.FloatingLabelInput}>
              <Text style={styles.Label}>Address Line 1*</Text>
              <TextInput
                style={styles.Input}
                value={form.line1}
                onChangeText={val => handleInput('line1', val)}
                placeholder="Street, building, etc."
                placeholderTextColor="#aaa"
                returnKeyType="next"
              />
            </View>
            <View style={styles.FloatingLabelInput}>
              <Text style={styles.Label}>Address Line 2</Text>
              <TextInput
                style={styles.Input}
                value={form.line2}
                onChangeText={val => handleInput('line2', val)}
                placeholder="Apt, suite, etc."
                placeholderTextColor="#aaa"
                returnKeyType="next"
              />
            </View>
            {/* City/State/Zip as a row */}
            <View style={styles.Row}>
              <View
                style={[styles.FloatingLabelInput, {flex: 1, marginRight: 4}]}>
                <Text style={styles.Label}>City*</Text>
                <TextInput
                  style={styles.Input}
                  value={form.city}
                  onChangeText={val => handleInput('city', val)}
                  placeholder="City"
                  placeholderTextColor="#aaa"
                  returnKeyType="next"
                />
              </View>
              <View
                style={[
                  styles.FloatingLabelInput,
                  {flex: 1, marginHorizontal: 4},
                ]}>
                <Text style={styles.Label}>State*</Text>
                <TextInput
                  style={styles.Input}
                  value={form.state}
                  onChangeText={val => handleInput('state', val)}
                  placeholder="State"
                  placeholderTextColor="#aaa"
                  returnKeyType="next"
                />
              </View>
              <View
                style={[styles.FloatingLabelInput, {flex: 1, marginLeft: 4}]}>
                <Text style={styles.Label}>Zip*</Text>
                <TextInput
                  style={styles.Input}
                  value={form.zip}
                  onChangeText={val => handleInput('zip', val)}
                  placeholder="Zip"
                  placeholderTextColor="#aaa"
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
              </View>
            </View>
            {error ? <Text style={styles.ErrorText}>{error}</Text> : null}
            <View style={styles.ModalButtonRow}>
              <TouchableOpacity
                style={styles.ModalButton}
                onPress={handleSubmit}>
                <Text style={styles.ModalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ModalButtonOutline}
                onPress={closeForm}>
                <Text style={styles.ModalButtonTextOutline}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
      {!expanded && addressAdded && (
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              color: '#27ae60',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
            }}>
            Address Added!
          </Text>
        </View>
      )}
    </View>
  );
};

export default AddAddressBtn;

const styles = StyleSheet.create({
  AddNewAddressArea: {
    overflow: 'visible',
    backgroundColor: Colors.primaryText,
    borderRadius: verticalScale(30),
    margin: verticalScale(14),
    // elevation: 25,
  },
  AddNewButton: {
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: verticalScale(30),
    elevation: 5,
  },
  AddNewButtonText: {
    color: Colors.primaryText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  FormAnimatedContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  FormArea: {
    padding: 14,
    justifyContent: 'center',
  },
  FloatingLabelInput: {
    marginBottom: 8,
  },
  Label: {
    fontSize: 13,
    color: Colors.backgroundPrimary,
    marginBottom: 2,
    fontFamily: 'Poppins-Regular',
  },
  Input: {
    borderWidth: 1,
    borderColor: Colors.backgroundPrimary,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.primaryText,
  },
  Row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ErrorText: {
    color: 'red',
    fontSize: 12,
    marginVertical: 4,
    textAlign: 'center',
  },
  ModalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  ModalButton: {
    backgroundColor: Colors.primaryText,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.backgroundPrimary,
  },
  ModalButtonText: {
    color: Colors.backgroundPrimary,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  ModalButtonOutline: {
    borderColor: Colors.backgroundPrimary,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: Colors.primaryText,
  },
  ModalButtonTextOutline: {
    color: Colors.backgroundPrimary,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
});
