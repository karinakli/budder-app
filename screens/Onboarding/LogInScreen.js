import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, useWindowDimensions, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../../assets/Themes/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect } from 'react'
import firebase, { db, auth } from "../../firebase"

const windowWidth = Dimensions.get('window').width;

export default function LogInScreen({navigation}) {
    const [username, onChangeUsername] = useState(null)
    const [password, onChangePassword] = useState(null)

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                navigation.replace("HomeScreen")
            }
        })
        return unsubscribe
    },[])

    const handleSignUp = () => {
        firebase.auth()
        .signInWithEmailAndPassword(username, password)
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loginHeader}>Login</Text>
                <Image style={styles.logo} source={require('../../assets/Images/budderfly.png')}/>      
            </View>
            <Text style={styles.loginText}>Please sign in to continue.</Text>
          <Text style={styles.header}>EMAIL ADDRESS</Text>
          <LinearGradient 
              colors={username ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
              style={styles.inputGrad}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
              <TextInput style={styles.inputFilled} onChangeText={onChangeUsername} value={username} placeholder="Email"/>
          </LinearGradient>
  
          <Text style={styles.header}>PASSWORD</Text>
          <LinearGradient 
              colors={password ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
              style={styles.inputGrad}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
              <TextInput secureTextEntry={true} style={styles.inputFilled} onChangeText={onChangePassword} value={password} placeholder="Password"/>
          </LinearGradient>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.yellowButton} onPress={() => {
                if (password && username) {
                    handleSignUp()
                }}}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 20 / fontScale, color: colors.rust}}>Log in</Text>
                <Image source={require('../../assets/Images/arrow-right.png')} style={{width: 20, height: 20, resizeMode: 'contain', position: 'absolute', left: '80%'}}/>
            </TouchableOpacity>
          </View>

          <Text style={[styles.loginText, {fontSize: 16 / fontScale, textAlign: 'center', position: 'absolute', top: '98%', width: windowWidth}]}>
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{color: colors.maroon, fontWeight: 'bold', top: 3}}> Sign Up</Text>
            </TouchableOpacity>
            
          </Text>
          
        </View>
      );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 25,
      backgroundColor: colors.white,
    },
    loginHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: 48/fontScale,
        marginTop: '40%',
        color: colors.rust,
    },
    loginText: {
        marginTop: 10,
        fontFamily: 'Inter-Regular',
        fontSize: 20 / fontScale,
        color: colors.darkGray,
    },
    logo: {
        position: 'absolute',
        top: '55%',
        left: '38%',
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20 / fontScale,
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
        width: '99.1%',
        marginHorizontal: 1,
        marginVertical: 12,
        padding: 10,
        borderRadius: 4,
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
        backgroundColor: '#D3D3D3',
        height: 67,
        width: 67,
        borderRadius: '50%',
        position: 'absolute',
        top: '95%',
        left: '85%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButtonFilled: {
        backgroundColor: '#C4C4C4',
        height: 67,
        width: 67,
        borderRadius: '50%',
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
        alignItems: 'center',
        flexDirection: 'row'
      },
  });
  
