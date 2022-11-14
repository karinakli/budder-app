import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect, useCallback } from 'react';

import {colors} from './assets/Themes/colors'
import {useFonts} from 'expo-font'

import * as SplashScreen from 'expo-splash-screen';
import LogInScreen from './screens/LogInScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import InterestsScreen from './screens/InterestsScreen';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  // const [logIn, setLogIn] = useState(false);
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
    // <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Interests" component={InterestsScreen} options={{headerShown: false}}/>
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
