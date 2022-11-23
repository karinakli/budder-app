import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, useCallback } from 'react';

import {colors} from './assets/Themes/colors'
import {useFonts} from 'expo-font'

import LogInScreen from './screens/LogInScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import InterestsScreen from './screens/InterestsScreen';
import HomeScreen from './screens/HomeScreen';
import AddProfileScreen from './screens/AddProfileScreen';
import LocationScreen from './screens/LocationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen'

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/Fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/Fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/Fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/Fonts/Inter-SemiBold.ttf'),
    'FredokaOne': require('./assets/Fonts/FredokaOne.ttf')
  });

  if (!fontsLoaded && !appIsReady) {
    return <AppLoading />;
  }

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Interests" component={InterestsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="AddProfile" component={AddProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Location" component={LocationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} option={{headerShown: false}}/>
          </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
