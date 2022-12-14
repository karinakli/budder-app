import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, useCallback } from 'react';

import {colors} from './assets/Themes/colors'
import {useFonts} from 'expo-font'

import LogInScreen from './screens/Onboarding/LogInScreen';
import SignUpScreen from './screens/Onboarding/SignUpScreen';
import DefaultScreen from './screens/Onboarding/DefaultScreen';
import InterestsScreen from './screens/Onboarding/InterestsScreen';
import HomeScreen from './screens/HomeScreen';
import AddProfileScreen from './screens/Onboarding/AddProfileScreen';
import LocationScreen from './screens/Onboarding/LocationScreen';
import ConfirmationScreen from './screens/Onboarding/ConfirmationScreen'
import SelectFriendScreen from './screens/SelectFriendScreen';
import AddFriendScreen from './screens/AddFriendScreen'
import CameraScreen from './screens/CameraScreen';
import ReelScreen from './screens/ReelScreen';
import LoadingScreen from './screens/LoadingScreen';
import SuggestionScreen from './screens/SuggestionScreen';
import ContactScreen from './screens/ContactScreen'

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
          <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="Default" component={DefaultScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false, gestureEnabled: false}} />
            <Stack.Screen name="Interests" component={InterestsScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="AddProfile" component={AddProfileScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="Location" component={LocationScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="HomeScreen" component={HomeScreen} option={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="AddFriend" component={AddFriendScreen}/>
            <Stack.Screen name="SelectFriend" component={SelectFriendScreen}/>
            <Stack.Screen name="Camera" component={CameraScreen}/>
            <Stack.Screen name="Reel" component={ReelScreen}/>
            <Stack.Screen name="Loading" component={LoadingScreen}/>
            <Stack.Screen name="Suggestion" component={SuggestionScreen}/>
            <Stack.Screen name="Contact" component={ContactScreen}/>
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
