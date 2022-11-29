import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../assets/Themes/colors'
import { db, auth } from "../firebase"
import { doc, updateDoc } from "firebase/firestore";

import * as Location from 'expo-location'

export default function LocationScreen({navigation}) {
    const [locationAllowed, setLocationAllowed] = useState(true);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const saveLocation = async (lat, long) => {
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            lastLat: lat,
            lastLong: long
        });
    }

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location)
        let locationObjForGeocode = {
            'latitude': location.coords.latitude,
            'longitude': location.coords.longitude
        }
        let address = await Location.reverseGeocodeAsync(locationObjForGeocode)
        setLocation(address[0].name);
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        saveLocation(location.coords.latitude, location.coords.longitude);
    }

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '80%'}}/>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
            <Image source={require('../assets/Images/location.png')}/>
            <Text style={styles.header}>TURN ON LOCATION</Text>
            <Text style={styles.paragraph}>Get more precise friendship recommendations without the unnecessary effort.</Text>
            <Text style={styles.paragraph}>{location}</Text>
            <TouchableOpacity style={styles.yellowButton} onPress={getLocation}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 20, color: colors.rust}}>Allow Location</Text>
            </TouchableOpacity>
          </View>
          
          {(locationAllowed) ? (
            <LinearGradient 
                style={styles.nextButton}
                colors={[colors.budder, colors.maroon]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                <TouchableOpacity style={styles.nextButtonFilled} onPress={() => navigation.navigate("Confirmation")}>
                    <Image source={require('../assets/Images/arrow-right.png')}/>
                </TouchableOpacity>
            </LinearGradient>
            
        ) : (
            <View style={styles.nextButton}>
                <Image source={require('../assets/Images/arrow-right.png')}/>
            </View>
        )}

        </View>
      );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 25,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    progressBar: {
        height: 7,
        flexDirection: "row",
        width: '100%',
        backgroundColor: colors.lightGray,
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20,
        marginTop: '15%',
        textAlign: 'center'
    },
    paragraph: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        width: 300,
    },
    yellowButton: {
        paddingHorizontal: 30,
        height: 51,
        borderRadius: 26,
        marginTop: '25%',
        backgroundColor: colors.budder,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: '#C4C4C4',
        height: 67,
        width: 67,
        borderRadius: '50%',
        position: 'absolute',
        top: '95%',
        left: '85%',
        justifyContent: 'center',
        alignItems: 'center'
    },
  });
  