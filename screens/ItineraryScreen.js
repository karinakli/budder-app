import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, useState, Pressable } from 'react-native';
import {colors} from '../assets/Themes/colors'

export default function ItineraryScreen({navigation}) {
    return (
      <View style={styles.container}>
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
  