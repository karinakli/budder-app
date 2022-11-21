import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'

export default function AddProfileScreen({navigation}) {
    const [profilePhoto, setProfilePhoto] = useState(true);

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '60%'}}/>
          </View>
          <Text style={styles.header}>ADD A PROFILE PHOTO</Text>
          <Image style={{marginTop: '10%'}}
            source={require('../assets/Images/add-photo.png')}/>
          <Text style={styles.bottomText}>skip for now</Text>
          
          {(profilePhoto) ? (
            <LinearGradient 
                style={styles.nextButton}
                colors={[colors.budder, colors.maroon]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                <TouchableOpacity style={styles.nextButtonFilled} onPress={() => navigation.navigate("Location")}>
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
    bottomText: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
        textDecorationLine: 'underline',
        position: 'absolute',
        top: '99%',
        left: '10%',
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
  