import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import Icon from 'react-native-ionicons';
import {memories} from '../assets/memoryData';

const windowWidth = Dimensions.get('window').width;

export default function ProfileScreen({navigation}) {
  const [profile, setProfile] = useState(false);

  const interestTypeObj = {
    interests: ["Cooking", "Traveling", "Art", "Gaming", "Dance", "Photography", "Baking", "Hiking", "Gym"],
    music: ["Pop", "Hip Hop", "EDM","Country", "Classical", "R&B", "Global"],
    foods: ["Mexican", "Italian", "Chinese", "Japanese", "Thai", "Indian", "American", "Greek", "Korean"], 
  }

  useEffect(() => {loadProfileDataFromFirebase()}, []);

  async function loadProfileDataFromFirebase() {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q,);
    querySnapshot.forEach((doc) => {
      if (doc.id !== auth.currentUser.uid) {
        setProfile(doc.data())
      }
    })
  }

  const renderItem = ({item}) => {
    return (
        <>
            <Image source={item.url} style={styles.memory}/>
        </>    
    )
    
  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.photoWrapper}>
          <Image
            source={profile ? {uri: profile.profilePhoto} : require('../assets/Images/placeholder.png')}
            style={styles.photo}
          />
          <Text style={styles.yellowBar} />
        </View>
        <View style={styles.nameLocation}>
          <Text style={styles.name}>{profile ? profile.name : 'Loading...'}</Text>
          <View style={styles.locationWrapper}>
            <Ionicons name="location" size={20} color={colors.budder} />
            <Text style={styles.location}>{profile ? profile.address : 'Loading...'}</Text>
          </View>
        </View>
        <View style={styles.interestsWrapper}>
          <Text style={styles.interestsTitle}>Interests</Text>
          <View style={styles.interests}>
            {profile ? profile.interests.map((interest, index) => {
              if (interestTypeObj.interests.includes(interest)) {
                return (
                  <View style={styles.interest} key={index}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                )
              }
            }) : null}
            <TouchableOpacity style={{justifyContent: 'center'}}>
              <Ionicons name="add" size={30} color={colors.rust} />
            </TouchableOpacity>
          </View>
          <Text style={styles.interestsTitle}>Music Taste</Text>
          <View style={styles.interests}>
            {profile ? profile.interests.map((interest, index) => {
              if (interestTypeObj.music.includes(interest)) {
                return (
                  <View style={styles.interest} key={index}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                )
              }
            }) : null}
            <TouchableOpacity style={{justifyContent: 'center'}}>
              <Ionicons name="add" size={30} color={colors.rust} />
            </TouchableOpacity>
          </View>
          <Text style={styles.interestsTitle}>Favorite Foods</Text>
          <View style={styles.interests}>
            {profile ? profile.interests.map((interest, index) => {
              if (interestTypeObj.foods.includes(interest)) {
                return (
                  <View style={styles.interest} key={index}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                )
              }
            }) : null}
            <TouchableOpacity style={{justifyContent: 'center'}}>
              <Ionicons name="add" size={30} color={colors.rust} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.horizonalRule} />
        <View style={styles.memoriesWrapper}>
          <Text style={styles.interestsTitle}>Memories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Reel', {selectedFriends: ["Me", "my friends"]})}>
              <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={memories}
          horizontal
          renderItem={item => renderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center'
    },
    photoWrapper: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    photo: {
      width: 187,
      height: 187,
      borderRadius: 93.5,
    },
    yellowBar: {
      zIndex: -1,
      width: '100%',
      height: 125,
      backgroundColor: colors.budder,
      position: 'absolute',
    },
    nameLocation: {
      width: '100%',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      color: colors.rust
    },
    locationWrapper: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    location: {
      fontSize: 16,
      color: colors.rust,
      marginLeft: 5
    },
    interestsWrapper: {
      width: '100%',
      marginLeft: 20,
    },
    interestsTitle: {
      fontSize: 24,
      marginLeft: 10,
      fontWeight: 'bold',
      color: colors.rust
    },
    interests: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    interest: {
      backgroundColor : colors.himalayan, 
      padding: 10,
      borderRadius: '50%',
      margin: 5
    },
    interestText: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 16,
      textAlign: 'center'
    },
    horizonalRule: {
      width: '90%',
      height: 0.5,
      backgroundColor: colors.lightGray,
      marginTop: 20
    },
    memoriesWrapper: {
      width: '100%',
      flexDirection: 'row',
      marginLeft: 20,
      marginTop: 20,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    seeAllText: {
      fontSize: 14,
      marginRight: 30,
      marginTop: 10,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textDecorationLine: 'underline',
    },
    memory: {
      width: windowWidth * 0.4,
      height: windowWidth * 0.4,
      margin: windowWidth * 0.02,
      borderRadius: 10,
    }
  });