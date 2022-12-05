import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView,Dimensions } from 'react-native';
import {colors} from '../assets/Themes/colors'

const windowWidth = Dimensions.get('window').width;

export default function ItineraryScreen({navigation}) {

    const [friendSelection, setFriendSelection] = useState("");
  
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <SafeAreaView>
            <Text style={styles.header}>GET TOGETHER</Text>
            <Text style={styles.paragraph}>let's plan a friend meetup</Text>
          </SafeAreaView>
        </View>
        <View style={styles.selectFriendContainer}>
          <Text style={styles.subheaderText} >I want to meetup with...</Text>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.gradientContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.selectionContainer}>
              <TouchableOpacity style={ (friendSelection === "friend" ) ? styles.buttonSelected : styles.button} onPress={() => setFriendSelection("friend")}>
                <Text style={styles.buttonText}>a friend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ (friendSelection === "group") ? styles.buttonSelected : styles.bottomButton} onPress={() => setFriendSelection("group")}>
                <Text style={styles.buttonText}>a group</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center'
    },
    headContainer: {
      backgroundColor: colors.budder,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      width: '100%',
      height: 150
    },
    header: {
      fontSize: 30,
      marginTop: 10,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 24,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textAlign: 'center',
      marginBottom: 20
    },
    selectFriendContainer: {
      backgroundColor: colors.white,
      marginTop: 20,
    },
    subheaderText: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center'
    },
    gradientContainer: {
      width: windowWidth * 0.9,
      padding: 1,
      marginVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    selectionContainer: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 5,
      fontSize: 16,
    },
    button: {
      padding: 10,
      flexDirection: 'row',
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 1,
      width: '100%',
    },
    buttonSelected: {
      padding: 10,
      flexDirection: 'row',
      backgroundColor: colors.budder,
      width: '100%',
    },
    bottomButton: {
      padding: 10,
      flexDirection: 'row',
      width: '100%',
    },
    buttonText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textAlign: 'center'
    },
    yellowButton: {
      backgroundColor: colors.budder,
      padding: 10,
      width: 250,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  