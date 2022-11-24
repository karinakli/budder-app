import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, useState, Pressable, TextInput } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItineraryScreen from './ItineraryScreen'
import ProfileScreen from './ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'

const HomeComp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.header}>Recommendations...</Text>
        <View style={styles.searchWrapper}>
          < TextInput style={styles.searchBar} placeholder="Search..."/>
        </View>
      </View>
      <View style={styles.friendList}>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

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
        <Tab.Screen name="HomeScreen" component={HomeComp} options={{headerShown: false}}/>
        <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBar: {
      marginTop: '1%',
      borderColor: colors.rust,
      borderWidth: 1,
      borderRadius: 5,
      width: '90%',
      height: '40%',
      paddingLeft: 3,
      backgroundColor: colors.saltAir
    },
    searchWrapper: {
      alignItems: 'center',
    },
    header: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 20,
      marginTop: '15%',
      marginLeft: '5%',
      textAlign: 'left'
    },
    search: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20,
      width: '100%',
      height: '20%',
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 2
    }
  });
  