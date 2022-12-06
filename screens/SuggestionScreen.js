import { Ionicons } from '@expo/vector-icons';
import { AutoFocus } from 'expo-camera';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, FlatList, useWindowDimensions } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { brunchSFData } from '../assets/brunchSFData';

const windowWidth = Dimensions.get('window').width;

export default function SuggestionScreen({navigation}) {
    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const MeetupItem = ({item}) => {
      const [selected, setSelected] = useState(false);

      return (
        <>
          <TouchableOpacity onPress={() => setSelected(!selected)}>
            <View style={[styles.planContainer, {
              borderBottomLeftRadius: selected ? 0 : 10,
              borderBottomRightRadius: selected ? 0 : 10,
            }]}>
              <Text style={styles.subHeader}>{item.activity} w/ {item.friend}</Text>
            </View>
          </TouchableOpacity>
          {selected ? (
            <>
              <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.detailedContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                <View style={styles.innerContainer}>
                  <Text style={[styles.paragraph, {textDecorationLine: 'underline'}]}>Address: </Text>
                  <Text style={[styles.paragraph, {marginLeft: 20, width: '80%'}]}>{'\u2022'} {item.address}</Text>
                  <Text style={[styles.paragraph, {textDecorationLine: 'underline', marginTop: 5}]}>Hours:</Text>
                  <Text style={[styles.paragraph, {marginLeft: 20, width: '80%'}]}>{'\u2022'} {item.hours}</Text>
                  <TouchableOpacity style={styles.contactButton} onPress={() => {
                    console.log("switch to contact"); 
                    navigation.push('Contact', {item: item})
                  }}>
                    <Text style={styles.contactText}>CONTACT</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </>
          ):null}
        </>
        
      )
    }
  
    return (
      <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10, flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('HomeScreen', {screen: 'Meetups'})}>
          <Image source={require('../assets/Images/arrow-left.png')} style={{marginTop: 20, width: 30, height: 30, resizeMode: 'contain'}}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center', height: '95%'}}>
          <Text style={styles.header}>SUGGESTED{'\n'}MEETUPS</Text>
          <FlatList 
            data={brunchSFData}
            renderItem={({item}) => {
              return <MeetupItem item={item}/>
            }}
            keyExtractor={item => item.id}
            showVerticalScrollIndiacator={false}
          />
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
    planContainer: {
      backgroundColor: colors.budder,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: windowWidth - 40,
      height: 100,
      marginTop: 30
    },
    detailedContainer: {
      width: windowWidth - 40,
      height: 200,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 1
    },
    innerContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 20,
    },
    contactButton: {
      backgroundColor: colors.budder,
      borderRadius: 22,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      position: 'absolute',
      bottom: 30,
      right: 30,
    },
    contactText: {
      fontSize: 14 / fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textDecorationLine: 'underline',
      textAlign: 'center'
    }
  });
  