import React from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/Store';
import MainNavigator from './src/Navigations/MainNavigation';
import {StripeProvider} from '@stripe/stripe-react-native';

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51RMMhm4Z4eanZ4WIYtfMvS6wiqyLDzEoYrRsJ2QaTauX4ZDvAqYCAcgMJjnVi24PfqR0KiTyTEHD2e2rG2CMcwp3002lBSG5J8">
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </StripeProvider>
  );
}
