import { Ionicons } from '@expo/vector-icons';
import { AutoFocus } from 'expo-camera';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, useWindowDimensions } from 'react-native';
import {colors} from '../assets/Themes/colors'

import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";

const windowWidth = Dimensions.get('window').width;

export default function LoadingScreen({navigation}) {
    const [profile, setProfile] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    useEffect(() => {loadProfileDataFromFirebase()}, []);

    async function loadProfileDataFromFirebase() {
      const usersRef = collection(db, "users");
      const q = query(usersRef);
      const querySnapshot = await getDocs(q,);
      querySnapshot.forEach((doc) => {
        if (doc.id === auth.currentUser.uid) {
          setProfile(doc.data())
        }
      })
    }

    function reset() {
      setSeconds(0);
      navigation.navigate('Suggestion')
    }

    useEffect(() => {
      let interval = null;
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)
      if (seconds === 5) {
        clearInterval(interval);
        reset()
      }
    }, [seconds])
  
    return (
      <View style={styles.container}>
        <LinearGradient 
        colors={['#FFF9F5', '#FFD883', '#FFCB58']}
        locations={[0,0.8, 0.9]}
        style={styles.background}>
          <Image source={require('../assets/Images/loading.png')} style={styles.loadingIcon}/>
          <Text style={styles.paragraph}>   L O A D I N G . . .</Text>
          <View style={styles.imageContainer}>
            <Image
              source={profile ? {uri: profile.profilePhoto} : require('../assets/Images/placeholder.png')}
              style={styles.photo}
            />
            <Image
              source={require('../assets/Images/placeholder.png')}
              style={[styles.photo, {position: 'absolute', left: '45%', top: '45%'}]}
            />
            <Image source={require('../assets/Images/big-plus3.png')} 
              style={styles.plusIcon}
            />
          </View>
          <Text style={styles.header}>PLANNING {'\n'}A FRIEND MEETUP</Text>
        </LinearGradient>
      </View>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 30 / fontScale,
      marginTop: 30,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
      marginBottom: 80
    },
    paragraph: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 30
    },
    loadingIcon: {
      width: 14,
      height: 20,
    },
    imageContainer: {
      width: 350,
      height: 315,
      paddingLeft: '5%'
    },
    photo: {
      width: 180,
      height: 180,
      resizeMode: 'contain',
      borderRadius: '70%'
    },
    plusIcon: {
      width: 70,
      height: 70,
      position: 'absolute',
      left: '43%',
      top: '40%'
    }
  });
  