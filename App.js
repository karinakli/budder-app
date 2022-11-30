import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, useCallback } from 'react';

import {colors} from './assets/Themes/colors'
import {useFonts} from 'expo-font'

import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DefaultScreen from './screens/DefaultScreen';
import InterestsScreen from './screens/InterestsScreen';
import HomeScreen from './screens/HomeScreen';
import AddProfileScreen from './screens/AddProfileScreen';
import LocationScreen from './screens/LocationScreen';
import ConfirmationScreen from './screens/ConfirmationScreen'
import SelectFriendScreen from './screens/SelectFriendScreen';
import AddFriendScreen from './screens/AddFriendScreen'

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
            <Stack.Screen name="Home" component={HomeScreen} option={{headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name="AddFriend" component={AddFriendScreen}/>
            <Stack.Screen name="SelectFriend" component={SelectFriendScreen}/>
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
