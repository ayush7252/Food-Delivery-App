import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/HomeScreen';
import MealScreen from '../Screens/MealScreen';
import ResturantScreen from '../Screens/ResturantScreen';
import CategoryScreen from '../Screens/CategoryScreen';
import CartScreen from '../Screens/CartScreen';
import AddressScreen from '../Screens/AddressScreen';
import SummaryScreen from '../Screens/SummaryScreen';
import SucessScreen from '../Screens/SucessScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MealScreen" component={MealScreen} />
        <Stack.Screen name="resturantScreen" component={ResturantScreen} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen}/>
        <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
        <Stack.Screen name="SucessScreen" component={SucessScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;

const styles = StyleSheet.create({});
