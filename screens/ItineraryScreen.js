import { Ionicons } from '@expo/vector-icons';
import { AutoFocus } from 'expo-camera';
import {LinearGradient} from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, useWindowDimensions } from 'react-native';
import {colors} from '../assets/Themes/colors'

const windowWidth = Dimensions.get('window').width;

export default function ItineraryScreen({navigation}) {
    const [locationSelection, setLocationSelection] = useState("");
    const [friendSelection, setFriendSelection] = useState("");
    const [planSelection, setPlanSelection] = useState("");

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)
  
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <SafeAreaView>
            <Text style={styles.header}>GET TOGETHER</Text>
            <Text style={styles.paragraph}>let's plan a friend meetup</Text>
          </SafeAreaView>
        </View>
        <View style={{height: '72%', paddingTop: 20}}>
        <ScrollView>
        <View style={[styles.selectFriendContainer, {marginTop: 0}]}>
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
        {friendSelection !== "" ? (
        <View style={styles.selectFriendContainer}>
          <Text style={styles.subheaderText} >somewhere...</Text>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.gradientContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.selectionContainer}>
              <TouchableOpacity style={ (locationSelection === "SF" ) ? styles.buttonSelected : styles.button} onPress={() => setLocationSelection("SF")}>
                <Text style={styles.buttonText}>in SF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ (locationSelection === "SC" ) ? styles.buttonSelected : styles.button} onPress={() => setLocationSelection("SC")}>
                <Text style={styles.buttonText}>in Santa Clara County</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ (locationSelection === "5 miles") ? styles.buttonSelected : styles.bottomButton} onPress={() => setLocationSelection("5 miles")}>
                <Text style={styles.buttonText}>within 5 miles</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        ) : null}
        {locationSelection !== "" ? (
        <View style={styles.selectFriendContainer}>
          <Text style={styles.subheaderText} >and I'm in the mood for...</Text>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.gradientContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.selectionContainer}>
              <TouchableOpacity style={ (planSelection === "a study date" ) ? styles.buttonSelected : styles.button} onPress={() => setPlanSelection("a study date")}>
                <Text style={styles.buttonText}>a study date</Text>
                <Ionicons name="school-outline" size={24} color={colors.rust} />
              </TouchableOpacity>
              <TouchableOpacity style={ (planSelection === "brunch" ) ? styles.buttonSelected : styles.button} onPress={() => setPlanSelection("brunch")}>
                <Text style={styles.buttonText}>brunch</Text>
                <Ionicons name="cafe-outline" size={24} color={colors.rust} />
              </TouchableOpacity>
              <TouchableOpacity style={ (planSelection === "an adventure" ) ? styles.buttonSelected : styles.button} onPress={() => setPlanSelection("an adventure")}>
                <Text style={styles.buttonText}>an adventure</Text>
                <Ionicons name="map-outline" size={24} color={colors.rust} />
              </TouchableOpacity>
              <TouchableOpacity style={ (planSelection === "something artsy" ) ? styles.buttonSelected : styles.bottomButton} onPress={() => setPlanSelection("something artsy")}>
                <Text style={styles.buttonText}>something artsy</Text>
                <Ionicons name="color-palette-outline" size={24} color={colors.rust} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        ) : null}
        </ScrollView> 
        </View>
        <View style={styles.buttonContainer}>
            {friendSelection === "" ? (
            <View style={styles.outlinedButton}>
              <Text style={styles.yellowButtonText}>0 of 3</Text>
            </View>
            ) : null }
            {friendSelection !== "" && locationSelection === "" ? (
            <View style={styles.outlinedButton}>
              <Text style={styles.yellowButtonText}>1 of 3</Text>
            </View>
            ) : null }
            { locationSelection !== "" && planSelection === "" ? (
            <View style={styles.outlinedButton}>
              <Text style={styles.yellowButtonText}>2 of 3</Text>
            </View>
            ) : null }
            {planSelection !== "" ? (
            <TouchableOpacity style={styles.yellowButton} onPress={() => navigation.navigate("Loading")}>
              <Text style={styles.yellowButtonText}>Find a plan</Text>
            </TouchableOpacity>
            ) : null }
        </View>
            
          
      </View>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
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
      fontSize: 30 / fontScale,
      marginTop: 10,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 24 / fontScale,
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
      fontSize: 20 / fontScale,
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
      fontSize: 16 / fontScale,
    },
    button: {
      padding: 10,
      flexDirection: 'row',
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      width: '100%',
    },
    buttonSelected: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.budder,
      width: '100%',
    },
    bottomButton: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    buttonText: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textAlign: 'center'
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      alignItems: 'center'
    },
    outlinedButton: {
      backgroundColor: colors.white,
      padding: 10,
      width: 250,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.rust,
      borderWidth: 2,
    },
    yellowButton: {
      backgroundColor: colors.budder,
      padding: 10,
      width: 250,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yellowButtonText: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center'
    }
  });
  