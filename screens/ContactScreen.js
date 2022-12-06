import { Ionicons } from '@expo/vector-icons';
import { AutoFocus } from 'expo-camera';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, FlatList, useWindowDimensions } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { brunchSFData } from '../assets/brunchSFData';

const windowWidth = Dimensions.get('window').width;

export default function ContactScreen({navigation, route}) {
    const item = route.params.item;

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

  
    return (
      <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10, flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Itinerary')}>
          <Image source={require('../assets/Images/arrow-left.png')} style={{marginTop: 20, width: 30, height: 30, resizeMode: 'contain'}}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/Images/sparkles.png')} style={styles.sparkleImage}/>
          <Text style={styles.header}>CONTACTING {item.friend.toUpperCase()}</Text>
          
        </View>
        
      </SafeAreaView>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 30 / fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
      marginTop: 40,
    },
    subHeader: {
      fontSize: 20/fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      lineHeight: 20,
    },
    sparkleImage: {
      width: 130,
      height: 185,
      marginTop: 100,
    }
  });
  