import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, useWindowDimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../../assets/Themes/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect } from 'react'
import firebase, { db, auth } from "../../firebase"

export default function SignUpScreen({navigation}) {
    const [username, onChangeUsername] = useState(null)
    const [password, onChangePassword] = useState(null)
    const [name, onChangeName] = useState(null)

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Interests")
            }
        })
        return unsubscribe
    },[])

    const handleSignUp = () => {
        firebase.auth()
        .createUserWithEmailAndPassword(username, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            db.collection('users').doc(user.uid).set({
                email: user.email,
                name: name
            })
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '20%', borderRadius: 5}}/>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Default')}>
            <Ionicons name="arrow-back" size={30} style={{marginTop: 20}} color={colors.rust}/>
          </TouchableOpacity>
          
          <Text style={[styles.header, {fontSize: 36/fontScale}]}>Create An {'\n'}Account</Text>
          <Text style={styles.header}>FULL NAME</Text>
          
          <LinearGradient 
              colors={name ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
              style={styles.inputGrad}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
              <TextInput style={styles.inputFilled} onChangeText={onChangeName} value={name} placeholder="Name"/>
          </LinearGradient>
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
  
          <TouchableOpacity style={styles.nextButton} onPress={() => {
                if (password && username) {
                    handleSignUp()
                }}}>
                <LinearGradient 
                style={styles.nextButtonFilled}
                colors={(name && password && username) ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                  <Image source={require('../../assets/Images/arrow-right.png')}/>
            </LinearGradient>
          </TouchableOpacity>
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
    progressBar: {
        height: 7,
        flexDirection: "row",
        width: '100%',
        backgroundColor: colors.lightGray,
        borderRadius: 5,
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
  });
  