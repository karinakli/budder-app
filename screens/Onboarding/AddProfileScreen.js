import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Button, Alert, useWindowDimensions} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../../assets/Themes/colors'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function AddProfileScreen({navigation}) {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePhoto(result.uri);
            setLoading(true);
            uploadImageAsync(result.uri)
        }
    }

    async function uploadImageAsync(uri) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const user = auth.currentUser;
        const storage = getStorage();
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        uploadBytesResumable(storageRef, blob)
            .then( async (snapshot) => {
                console.log('Uploaded a blob or file!');
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function saveUrl() {
        const user = auth.currentUser;
        const storage = getStorage();
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        const url = await getDownloadURL(storageRef);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            profilePhoto: url
        });
    }

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '60%', borderRadius: 5,}}/>
          </View>
          <Text style={styles.header}>ADD A PROFILE PHOTO</Text>
          <TouchableOpacity onPress={pickImage}>
            {profilePhoto ? <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
             : <Image style={{marginTop: '10%'}} source={require('../assets/Images/add-photo.png')}/> }
          </TouchableOpacity>
          <Text style={{marginTop: '5%'}}>{loading ? "Uploading ..." : ""}</Text>
          <TouchableOpacity style={styles.bottomText} onPress={() => navigation.navigate("Location")}>
            {profilePhoto ? <Text style={styles.bottomText}></Text>: <Text style={styles.bottomText}>skip for now</Text>}
          </TouchableOpacity>
          
          <LinearGradient 
              style={styles.nextButton}
              colors={profilePhoto && !loading ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              location={[0, 0.8]}>
              <Pressable style={styles.nextButtonFilled} onPress={() => {
                if (profilePhoto) {
                    saveUrl()
                    navigation.navigate("Location")
                }
                }}>
                  <Image source={require('../assets/Images/arrow-right.png')}/>
              </Pressable>
          </LinearGradient>

        </View>
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
  
