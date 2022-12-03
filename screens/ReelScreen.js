import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, useWindowDimensions, SafeAreaView, Dimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'
import {colors} from '../assets/Themes/colors'
import {memories} from '../assets/memoryData';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default function ReelScreen({navigation, route}) {
    const selectedFriends = route.params.selectedFriends;
    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    function getHeader() {
        return selectedFriends[0] + " and " + selectedFriends[1];
    }

    const renderItem = ({item}) => {
        return (
            <>
                <Image source={item.url} style={{width: windowWidth * 0.32,height: windowWidth * 0.32, margin: windowWidth*0.006}}/>
            </>    
        )
        
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headContainer}>
                <TouchableOpacity style={{width: 70, height: 40, marginLeft: 10, flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.pop()}>
                    <Image source={require('../assets/Images/arrow-left.png')} style={{marginTop: 20, width: 30, height: 30, resizeMode: 'contain'}}/>
                    <Text style={[styles.paragraph, {marginTop: 18}]}>Profile</Text>
                </TouchableOpacity>
                <Text style={styles.header}>MEMORY REEL</Text>
                <Text style={styles.paragraph}>{getHeader()}</Text>
            </SafeAreaView>
            <SafeAreaView style={{marginTop: 20, flex: 1}}>
                <FlatList
                    numColumns={3}
                    data={memories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity style={[styles.addPhoto, styles.shadowProp]}>
                    <Image source={require('../assets/Images/plus.png')} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
      );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.himalayan,
    },
    header: {
        fontSize: 30 / fontScale,
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        textAlign: 'center',
        marginTop: 30,
    },
    paragraph: {
        fontSize: 16 / fontScale,
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        textAlign: 'center'
    },
    headContainer: {
        backgroundColor: colors.budder,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        padding: 20,
        height: 210,
    },
    addPhoto: {
        width: 65,
        height: 65,
        borderRadius: '50%',
        backgroundColor: colors.budder,
        position: 'absolute',
        top: '85%',
        left: '80%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadowProp: {
        shadowColor: colors.darkGray,
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
  });
  
