import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'

export default function InterestsScreen({navigation}) {
    const [interests, setInterests] = useState(null)
    const [music, setMusic] = useState(null)
    const [foods, setFoods] = useState(null)

    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
            <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '50%'}}/>
        </View>
        <Text style={styles.paragraph}>Fill out your interests so we can customize your friendship recommendations!</Text>
        <Text style={styles.header}>INTERESTS/HOBBIES</Text>
        <Text style={styles.header}>MUSIC TASTE</Text>
        <Text style={styles.header}>FAVORITE FOODS</Text>

        {(interests && music && foods) ? (
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
        marginBottom: 20,
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20,
        marginTop: '10%',
        textAlign: 'left'
    },
    paragraph: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
        textAlign: 'center'
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
  