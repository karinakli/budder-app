import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, useState, Pressable } from 'react-native';
import {colors} from '../assets/Themes/colors'

export default function LogInScreen({navigation}) {
    return (
      <View style={styles.container}>
        <LinearGradient 
        colors={['#FFF9F5', '#FFD883', '#FFCB58']}
        locations={[0,0.8, 0.9]}
        style={styles.background}>
          <Image source={require('../assets/budder-logo.png')}/>
          <Text style={styles.valueProp}>MAKE MEMORIES TOGETHER</Text>
          <Pressable style={styles.whiteButton} onPress={() => navigation.navigate("Home")}>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 24, color: colors.rust}}>Login</Text>
          </Pressable>
          <Pressable style={styles.yellowButton} onPress={() => navigation.navigate("Onboarding")}>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 24, color: colors.rust}}>Sign Up</Text>
          </Pressable>
      </LinearGradient>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    whiteButton: {
      width: '60%', 
      height: 51,
      borderRadius: 26,
      marginTop: '50%',
      backgroundColor: 'white',
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
      alignItems: 'center'
    },
    valueProp: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20,
    }
  });
  