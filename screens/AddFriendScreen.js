import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Button, Alert, useWindowDimensions, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/Themes/colors'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export default function AddFriendScreen({navigation, route}) {
    const selectedFriends = route.params.selectedFriends;
    const [sharedInterests, setSharedInterests] = useState(["Cooking", "Traveling", "Art", "Gaming"]);
    const mutualPics = [require('../assets/Images/pfp1.png'), require('../assets/Images/pfp2.png'), require('../assets/Images/pfp3.png'), 
        require('../assets/Images/pfp4.png'), require('../assets/Images/pfp5.png'), require('../assets/Images/pfp6.png')]

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    function getHeader() {
        let header = "";
        for (let i = 0; i < selectedFriends.length; i++) {
            if (i == selectedFriends.length - 1) {
                header += ' & '
            }
            header += selectedFriends[i].toUpperCase();
            if (i < selectedFriends.length - 2) {
                header += ", ";
            }
        }
        return header + 'S FRIENDSHIP'
    }

    const ListItem = (props) => {
        const {item} = props;
    
        const {fontScale} = useWindowDimensions();
        const styles = makeStyles(fontScale)
        return (
            <View>
            <View style={{marginHorizontal: '5%', marginVertical: 5}}>
                <View style={{ backgroundColor : colors.himalayan, 
                                padding: 10,
                                borderRadius: '50%',
                                alignItems: 'center',
                                justifyContent: 'center', }}>
                    <Text style={styles.paragraph}>{props.name}</Text>
                </View>
            </View>    
            </View>
            
        );
    }

    const listInterests = sharedInterests.map((item) =>
        <ListItem key={item} name={item}/>
    );

    const listMutualPics = mutualPics.map((item) =>
        <Image style={styles.mutualPic} source={item}/>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10}} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back" color={colors.rust} size={40} style={styles.closeIcon}/>
            </TouchableOpacity>
            
            <View style={{alignItems: 'center'}}>
                {/* TODO: open camera roll to upload photos */}
                <TouchableOpacity onPress={() => navigation.navigate('Camera', {selectedFriends: selectedFriends})}>
                    <Image source={require('../assets/Images/add-image.png')}/>
                </TouchableOpacity>
                <Text style={styles.header}>{getHeader()}</Text>
            
                <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.reelContainer}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                    <View style={styles.reelFillContainer}>
                        <Image source={require('../assets/Images/grey-camera.png')} style={styles.backgroundCamera}/>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../assets/Images/reel.png')}/>
                            <Text style={[styles.paragraph, {marginLeft: 10}]}>Your Reel</Text>
                        </View>
                        <Text style={[styles.paragraph, {textAlign: 'center', marginTop: 20}]}>Nothing to see here.{'\n'}Snap a photo to get started!</Text>
                    </View>
                </LinearGradient>
                <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.reelContainer}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                    <View style={styles.interestsFillContainer}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                            <Image source={require('../assets/Images/reel.png')}/>
                            <Text style={[styles.paragraph, {marginLeft: 10}]}>Shared Interests</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text>{listInterests}</Text>
                        </View>
                        
                    </View>
                </LinearGradient>
                <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.originContainer}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                    <View style={styles.originFillContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../assets/Images/banner.png')}/>
                            <Text style={[styles.paragraph, {marginLeft: 10}]}>
                                Friendship profile founded {'\n'}
                                <Text style={[styles.paragraph, {fontFamily: 'Inter-Bold'}]}>4 months ago!</Text>
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <LinearGradient 
                colors={[colors.budder, colors.maroon]}
                style={styles.mutualContainer}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
                    <View style={styles.originFillContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../assets/Images/puzzle.png')}/>
                            <Text style={[styles.paragraph, {marginLeft: 10}]}>
                                A few of your mutual friends...
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
                            {listMutualPics}
                        </View>
                    </View>
                </LinearGradient>
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
        width: '80%',
        textAlign: 'center',
        marginTop: 20
    },
    paragraph: {
        fontSize: 16 / fontScale,
        fontFamily: 'Inter-Regular',
        color: colors.rust,
    },
    reelContainer: {
        width: '90%',
        minHeight: 150,
        borderRadius: 5,
        padding: 1,
        marginTop: 15
    },
    reelFillContainer: {
        backgroundColor: 'white',
        flex: 1,
        padding: 15,
        borderRadius: 5,
    },
    backgroundCamera: {
        position: 'absolute',
        top: '40%',
        left: '45%',
        zIndex: -1,
    },
    interestsFillContainer: {
        backgroundColor: 'white',
        flex: 1,
        padding: 15,
        borderRadius: 5,
        justifyContent: 'space-evenly',
    },
    originContainer: {
        width: '90%',
        minHeight: 70,
        borderRadius: 5,
        padding: 1,
        marginTop: 15
    },
    originFillContainer: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'center',
    },
    mutualPic: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    mutualContainer: {
        width: '90%',
        minHeight: 100,
        borderRadius: 5,
        padding: 1,
        marginTop: 15
    }
  });
  
