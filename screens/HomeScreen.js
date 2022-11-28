import { useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItineraryScreen from './ItineraryScreen'
import ProfileScreen from './ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeComp = () => {
  const filters = ['name', 'distance', 'lastMet', 'numMems']
  const [filter, setFilter] = useState(filters[0]);
  const friends = [
    {name: 'Karina', distance: 'Irvine, CA', lastMet: '2021-10-23', numMems: 44, interests: ['baking', 'painting', 'hiking'], image: require('../assets/Images/karina.png')},
    {name: 'Andrea', distance: 'Cupertino, CA', lastMet: '2022-10-28', numMems: 172, interests: ['dancing', 'traveling', 'gaming'], image: require('../assets/Images/andrea.png')},
    {name: 'Jaime', distance: 'Stanford, CA', lastMet: '2022-11-27', numMems: 10, interests: ['hiking', 'journaling', 'soccer'], image: require('../assets/Images/jaime.png')},
    {name: 'Daniel', distance: 'Miami, FL', lastMet: '2022-11-28', numMems: 4400, interests: ['hiking', 'traveling', 'gaming'], image: require('../assets/Images/daniel.png')},
  ]
  
  const renderFriend = ({item}) => {
    const getInterests = () => {
      const len = Math.min(4, item.interests.length);
      let interests = 'Enjoys ';
      for (let i = 0; i < len; i++) {
        if (i == len - 1) {
          interests += 'and ';
        }
        interests += item.interests[i];
        if (i < len - 1) {
          interests += ', ';
        } 
      }
      return interests;
    }
    return (
      <TouchableOpacity>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.friendContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.innerContainer}>
            <Image source={item.image} style={{marginRight: 15}}/>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.friendHeader}>{item.name.toUpperCase()}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.paragraph}>{item.distance}</Text>
                <Text style={styles.boldParagraph}>{item.numMems} mems</Text>
              </View>
              <Text style={[styles.paragraph, {marginTop: 20}]}>{getInterests()}</Text>
            </View>
          </View>       
        </LinearGradient>
      </TouchableOpacity>
      
      
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.header}>Recommendations...</Text>
        <View style={styles.searchWrapper}>
          < TextInput style={styles.searchBar} placeholder="Search..."/>
        </View>
        <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>{filter.toUpperCase()}</Text>
            <Ionicons name="arrow-down" color={colors.rust}/>
        </TouchableOpacity>
        
      </View>
      <View style={styles.friendList}>
        <FlatList
          data={friends}
          renderItem={renderFriend}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
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
      fontSize: 24,
      marginTop: '4%',
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
      fontSize: 12,
      marginRight: 5,
    },
    paragraph: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 14,
    },  
    boldParagraph: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 14,
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
      fontSize: 24,
      color: colors.rust,
    }, 
  });
  