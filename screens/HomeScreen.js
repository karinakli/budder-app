import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, useState, Pressable } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItineraryScreen from './ItineraryScreen'
import ProfileScreen from './ProfileScreen'

const HomeComp = () => {
  return (
    <View style={styles.container}>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation}) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeComp} option={{headerShown: false}}/>
        <Tab.Screen name="Itinerary" component={ItineraryScreen} option={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} option={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    whiteButton: {
      width: '60%', 
      height: 51,
      borderRadius: 26,
      marginTop: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    yellowButton: {
      width: '60%', 
      height: 51,
      borderRadius: 26,
      marginTop: '10%',
      backgroundColor: colors.budder,
      justifyContent: 'center',
      alignItems: 'center'
    },
    valueProp: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20,
    }
  });
  