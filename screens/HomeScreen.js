import { forwardRef, useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, useWindowDimensions, Modal } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ItineraryScreen from './ItineraryScreen'
import ProfileScreen from './ProfileScreen'
import AddFriendScreen from './AddFriendScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeComp from '../components/HomeComp';

import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import distanceBetweenCoords from '../util';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const AddFriendStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="HomeScreen" component={HomeComp}/>
//       <Stack.Screen name="AddFriend" component={AddFriendScreen} />
//     </Stack.Navigator>
//   );
// }

export default function HomeScreen({navigation}) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = 'home'
            } else if (route.name === 'Itinerary') {
              iconName = 'list'
            } else if (route.name === 'Profile') {
              iconName = 'person'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.budder,
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeComp} options={{headerShown: false, gestureEnabled: false}}/>
        <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center'
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBar: {
      marginTop: '2%',
      borderColor: colors.rust,
      borderWidth: 1,
      borderRadius: 5,
      width: '90%',
      height: '45%',
      paddingLeft: 3,
      backgroundColor: '#F8F7F7'
    },
    searchWrapper: {
      alignItems: 'center',
    },
    header: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 24 / fontScale,
      marginTop: '4%',
      marginLeft: '5%',
      textAlign: 'left'
    },
    search: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20 / fontScale,
      width: '100%',
      height: '20%',
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 2
    },
    filterButton: {
      backgroundColor: colors.himalayan,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 25,
      marginRight: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: '-5%',
      flexDirection: 'row',
    },
    filterText: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 12 / fontScale,
      marginRight: 5,
    },
    paragraph: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 14 / fontScale,
    },  
    boldParagraph: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 14 / fontScale,
    },
    friendList: {
      alignItems: 'center',
      flex: 1,
      width: '90%',
      marginTop: 15,
    },
    friendContainer: {
      width: windowWidth * 0.9,
      padding: 1,
      marginVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    innerContainer: {
      width: '100%',
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 5,

    },
    friendHeader: {
      fontFamily: 'Inter-Bold',
      fontSize: 24 / fontScale,
      color: colors.rust,
    }, 
    modal: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'flex-end',
    },
    modalBackground: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingBottom: 60,
    },
    modalText: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 16 / fontScale,
    },
    modalRow: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: '5%', 
      alignItems: 'center',
      marginTop: 20,
    },
    closeIcon: {
      position: 'absolute',
      top: windowWidth * 0.05,
      left: windowWidth * 0.90,
    },
    addFriend: {
      width: 65,
      height: 65,
      borderRadius: '50%',
      backgroundColor: colors.budder,
      position: 'absolute',
      top: '95%',
      left: '80%',
      zIndex: 100,
      justifyContent: 'center',
      alignItems: 'center'
    },
    shadowProp: {
      shadowColor: colors.darkGray,
      shadowOffset: {width: 3, height: 4},
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
  });
  
