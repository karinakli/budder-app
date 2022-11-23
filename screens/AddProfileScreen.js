import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Button} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function AddProfileScreen({navigation}) {
    const [profilePhoto, setProfilePhoto] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePhoto(result.uri);
            handleSavePhoto(result.uri)
        }
    }

    async function uploadImageAsync(uri) {
        const storage = getStorage();
        const storageRef = ref(storage, `profiles/${auth.currentUser.uid}`);

        uploadBytes(storageRef, profilePhoto).then((snapshot) => {
            console.log(snapshot);
        });
    }

    const handleSavePhoto = async (uri) => {
        const profileURI = await uploadImageAsync(uri);
        // const user = auth.currentUser;
        // const userRef = doc(db, "users", user.uid);
        // await updateDoc(userRef, {
        //     profilePic: profileURI
        // });
    }

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '60%'}}/>
          </View>
          <Text style={styles.header}>ADD A PROFILE PHOTO</Text>
          <TouchableOpacity onPress={pickImage}>
            {profilePhoto ? <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
             : <Image style={{marginTop: '10%'}} source={require('../assets/Images/add-photo.png')}/> }
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomText} onPress={() => navigation.navigate("Location")}>
            <Text style={styles.bottomText}>skip for now</Text>
          </TouchableOpacity>
          
          <LinearGradient 
              style={styles.nextButton}
              colors={profilePhoto ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              location={[0, 0.8]}>
              <Pressable style={styles.nextButtonFilled} onPress={() => {
                if (profilePhoto) {
                    // handleSavePhoto()
                }
                navigation.navigate("Location")
                }}>
                  <Image source={require('../assets/Images/arrow-right.png')}/>
              </Pressable>
          </LinearGradient>

        </View>
      );
  }

  const styles = StyleSheet.create({
    profilePhoto: {
        width: 300,
        height: 300,
        marginTop: "10%",
        borderRadius: 150
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
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20,
        marginTop: '15%',
        textAlign: 'center'
    },
    bottomText: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
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
  