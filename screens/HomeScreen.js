import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ItineraryScreen from './ItineraryScreen'
import ProfileScreen from './ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeComp from '../components/HomeComp';

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function HomeScreen({navigation}) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
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
        <Tab.Screen name="Home" component={HomeComp} options={{headerShown: false, gestureEnabled: false}}/>
        <Tab.Screen name="Meetups" component={ItineraryScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }

  
