import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'

export default function OnboardingScreen({navigation}) {
    const [username, onChangeName] = useState(null)
    const [number, onChangeNumber] = useState(null)

    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
            <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '25%'}}/>
        </View>
        <Text style={styles.header}>WHAT IS YOUR FULL NAME?</Text>
        
        {username ? (
            <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.inputGrad}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                <TextInput style={styles.inputFilled} onChangeText={onChangeName} value={username} placeholder="Your Name"/>
            </LinearGradient>
        ) : (
            <TextInput style={styles.input} onChangeText={onChangeName} value={username} placeholder="Your Name"/>
        )}

        <Text style={styles.header}>PHONE NUMBER</Text>
        {number ? (
            <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.inputGrad}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                <TextInput style={styles.inputFilled} onChangeText={onChangeNumber} value={number} placeholder="Phone Number"/>
            </LinearGradient>
        ) : (
            <TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder="Phone Number"/>
        )}

        {(number && username) ? (
            <LinearGradient 
                style={styles.nextButton}
                colors={[colors.budder, colors.maroon]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                <Pressable style={styles.nextButtonFilled} onPress={() => navigation.navigate("Interests")}>
                    <Image source={require('../assets/Images/arrow-right.png')}/>
                </Pressable>
            </LinearGradient>
            
        ) : (
            <Pressable style={styles.nextButton}>
                <Image source={require('../assets/Images/arrow-right.png')}/>
            </Pressable>
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
        marginTop: '10%',
        textAlign: 'left'
    },
    input: {
        height: 40,
        marginHorizontal: 1,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#606060'
    },
    inputFilled: {
        height: 40,
        width: '99%',
        marginHorizontal: 1,
        marginVertical: 12,
        padding: 10,
        borderRadius: 5,
        backgroundColor: colors.white,
        borderColor: '#606060'
    },
    inputGrad: {
        marginVertical: 12,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
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
  