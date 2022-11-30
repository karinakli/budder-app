import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Button, Alert, useWindowDimensions, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function AddFriendScreen({navigation}) {

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)
    return (
        <SafeAreaView style={styles.container}>
            <Text>Add Friend Screen</Text>
        </SafeAreaView>
      );
  }

  const makeStyles = fontScale => StyleSheet.create({
    profilePhoto: {
        width: 200,
        height: 200,
        marginTop: "10%",
        borderRadius: 150,
        borderWidth: 2,
        borderColor: colors.rust,
    },
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 25,
      backgroundColor: colors.white,
      alignItems: 'center',
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
        marginTop: '15%',
        textAlign: 'center'
    },
    bottomText: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16 / fontScale,
        textDecorationLine: 'underline',
        position: 'absolute',
        top: '99%',
        left: '10%',
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
  
