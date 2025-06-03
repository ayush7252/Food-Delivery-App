import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {verticalScale, width} from '../../Dimensions';
import Colors from '../../Colors';
import {RupeeSymbol} from '../../config';
import {UpArrow} from '../../assets/Icons';
import {useNavigation} from '@react-navigation/native';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import LottieView from 'lottie-react-native';

const PayButton = (data: any) => {
  const Amount = data.data;
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [paymentSheetLoaded, setPaymentSheetLoaded] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultType, setResultType] = useState<'success' | 'fail' | null>(null);
  const fetchPaymentSheetParams = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://stripebackend-nhms.onrender.com/payment-sheet',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            amount: Amount * 100,
            currency: 'inr',
            payment_method_types: ['card'],
          }),
        },
      );
      const data = await response.json();

      if (!data.clientSecret) {
        throw new Error(data.error || 'No client secret returned');
      }

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Food App',
        paymentIntentClientSecret: data.clientSecret,
      });

      if (error) {
        Alert.alert('Stripe Init Error', error.message);
        setPaymentSheetLoaded(false);
      } else {
        setPaymentSheetLoaded(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log(err);
      Alert.alert('Error', errorMessage);
      setPaymentSheetLoaded(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPaymentSheetParams();
  }, []);
  const openPaymentSheet = async () => {
    setLoading(true);
    const {error} = await presentPaymentSheet();

    if (error) {
      // navigation.navigate('FailedLoaderScreen');
      setResultType('fail');
      setShowResultModal(true);
    } else {
      setResultType('success');
      setShowResultModal(true);
      // navigation.navigate('SucessLoaderScreen');
      // navigation.navigate('SucessScreen');
    }
    setLoading(false);
  };

  return (
    <View style={styles.MainContainer}>
      <View>
        <Text>Choose Method</Text>
        <TouchableOpacity style={styles.OptionButton}>
          <Text>Credit Card</Text>
          <Image source={UpArrow} style={styles.OptionIcon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={openPaymentSheet}
        disabled={!paymentSheetLoaded || loading}>
        <Text style={styles.PayText}>Pay</Text>
        <Text style={styles.PayText}>
          {' '}
          • {RupeeSymbol} {Amount}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showResultModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowResultModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.lottieContainer}>
            <LottieView
              source={
                resultType === 'success'
                  ? require('../../assets/ConstantsData/Payment Sucess.json')
                  : require('../../assets/ConstantsData/Payment Failed.json')
              }
              autoPlay
              loop={false}
              style={styles.lottie}
              onAnimationFinish={() => {
                setTimeout(() => {
                  setShowResultModal(false);
                  if (resultType === 'success') {
                    navigation.navigate('SucessScreen');
                  }
                }, 1600);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PayButton;

const styles = StyleSheet.create({
  MainContainer: {
    height: verticalScale(50),
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: verticalScale(30),
    flexDirection: 'row',
  },
  PayButton: {
    width: '50%',
    height: '100%',
    borderRadius: verticalScale(30),
    backgroundColor: Colors.primaryText,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  PayText: {
    fontSize: verticalScale(14),
    fontFamily: 'Poppins-Medium',
    color: Colors.backgroundSecondary,
    right: verticalScale(3),
  },
  OptionIcon: {
    height: verticalScale(10),
    width: verticalScale(10),
  },
  OptionButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  lottie: {
    width: width * 2,
    height: width * 2,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieContainer: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: 300,
  },
});
