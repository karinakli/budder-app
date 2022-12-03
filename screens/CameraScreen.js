import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Button, Alert, useWindowDimensions, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons'
import {colors} from '../assets/Themes/colors'
import { Camera, CameraType } from 'expo-camera';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export default function CameraScreen({navigation, route}) {
    const selectedFriends = route.params.selectedFriends;
    const [flash, setFlash] = useState(false);
    const [cameraFace, setCameraFace] = useState(false); // false = front, true = back
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
      }
    
      if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }

    const flipCamera = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
        setCameraFace(!cameraFace);
    }

    const takePicture = () => {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10}} onPress={() => navigation.pop()}>
                <Ionicons name="close" color={colors.rust} size={40} style={styles.closeIcon}/>
            </TouchableOpacity>
            
            <View style={{alignItems: 'center'}}>
                <Text style={styles.header}>MAKE A MEMORY</Text>
                <Text style={[styles.paragraph]}>Snap a photo to add to your friendship memory reel!</Text>
                <Camera style={styles.camera} type={type}>
                </Camera>
                <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly'}}>
                    {flash ? (
                        <TouchableOpacity onPress={() => setFlash(false)}>
                            <Ionicons name="flash" size={50} color={colors.rust}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => setFlash(true)}>
                            <Ionicons name="flash-off" size={50} color={colors.rust}/>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => takePicture()}>
                        <Image source={require('../assets/Images/camera2.png')} style={{width: 60, height: 60, resizeMode: 'contain', marginLeft: 30, marginRight: 33}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => flipCamera()}>
                        <Image source={require('../assets/Images/repeat2.png')} style={styles.switch}/>
                    </TouchableOpacity>
                    
                </View>
            </View>

            
        </SafeAreaView>
      );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 25,
      backgroundColor: colors.himalayan,
    },
    header: {
        fontSize: 24 / fontScale,
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        textAlign: 'center',
        marginTop: -10,
    },
    paragraph: {
        fontSize: 14 / fontScale,
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        textAlign: 'center',
        marginTop: 5,
    },
    camera: {
        width: '80%',
        height: '78%',
        borderWidth: 2,
        borderColor: colors.rust,
        marginTop: 20,
    },
    switch: {
        width: 50, 
        height: 50, 
        resizeMode: 'contain', 
        marginTop: 3
    }
  });
  
