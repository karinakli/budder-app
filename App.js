import { StyleSheet, Text, View, Image, useState, Pressable } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {colors} from './assets/Themes/colors'
import {useFonts} from 'expo-font'

import SplashScreen from './screens/SplashScreen';
import LogInScreen from './screens/LogInScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import InterestsScreen from './screens/InterestsScreen';


const Stack = createStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/Fonts/Inter-Bold.ttf'),
    'Inter-Light': require('./assets/Fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/Fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/Fonts/Inter-SemiBold.ttf'),
    'FredokaOne': require('./assets/Fonts/FredokaOne.ttf')
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/> */}
        <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Interests" component={InterestsScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
