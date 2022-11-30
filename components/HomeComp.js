import { forwardRef, useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, useWindowDimensions, Modal } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ItineraryScreen from '../screens/ItineraryScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from '@expo/vector-icons/Ionicons'
import AddFriendButton from './AddFriendButton';

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function HomeComp({navigation}) {
  const filters = ['name', 'distance', 'lastMet', 'numMems']
  const [filter, setFilter] = useState(filters[0]);
  // TODO: Remove
  let starterfriends = [
    { default: true, name: 'Karina', distance: 'Irvine, CA', lastMet: '2021-10-23', numMems: 44, interests: ['baking', 'painting', 'hiking'], image: require('../assets/Images/karina.png')},
    { default: true, name: 'Andrea', distance: 'Cupertino, CA', lastMet: '2022-10-28', numMems: 172, interests: ['dancing', 'traveling', 'gaming'], image: require('../assets/Images/andrea.png')},
    { default: true, name: 'Jaime', distance: 'Stanford, CA', lastMet: '2022-11-27', numMems: 10, interests: ['hiking', 'journaling', 'soccer'], image: require('../assets/Images/jaime.png')},
    { default: true, name: 'Daniel', distance: 'Miami, FL', lastMet: '2022-11-28', numMems: 4400, interests: ['hiking', 'traveling', 'gaming'], image: require('../assets/Images/daniel.png')},
  ]
  const [showModal, setModalPopup] = useState(false);

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale)

  const [friends, setFriends] = useState(null)

  useEffect(() => { loadProfilesFromFirebase() }, [])

  async function loadProfilesFromFirebase() {
    let responseObjects = []
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q, );
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      responseObjects = [...responseObjects, data]
    })
    let newFriendsArrayPromise = await transformServerResponseObjects(responseObjects)
      .then(newFriends => setFriends(newFriends))
      .catch(err => console.log(err))
  }

  async function transformServerResponseObjects(responseObjects) {
    let newFriendObjects = []
    for (let i = 0; i < responseObjects.length; i++) {
      let friendResponse = responseObjects[i]
      let newFriendObj = { name: 'Daniel', distance: 'Miami, FL', lastMet: '2022-11-28', numMems: 4400, interests: ['hiking', 'traveling', 'gaming'], image: require('../assets/Images/daniel.png')}
      newFriendObj.name = friendResponse.name
      newFriendObj.image = friendResponse.profilePhoto
      newFriendObj.distance = friendResponse.address
      newFriendObj.interests = friendResponse.interests
      newFriendObjects = [...newFriendObjects, newFriendObj]
    }
    return [...newFriendObjects, ...starterfriends]
  }

  
  const renderFriend = ({item}) => {
    const getInterests = () => {
      const len = Math.min(4, item.interests.length);
      let interests = 'Enjoys ';
      for (let i = 0; i < len; i++) {
        if (i == len - 1) {
          interests += 'and ';
        }
        interests += item.interests[i];
        if (i < len - 1) {
          interests += ', ';
        } 
      }
      return interests;
    }
    return (
      <TouchableOpacity key={item.name}>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.friendContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.innerContainer}>
            {/* TODO - fix this default thing when we get rid of fake images.*/}
            <Image source={ item.default ? item.image : {uri: item.image}} style={{marginRight: 15, width: '27%', height: '100%', borderRadius: "50%"}}/>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.friendHeader}>{item.name.toUpperCase()}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.paragraph}>{item.distance}</Text>
                <Text style={styles.boldParagraph}>{item.numMems} mems</Text>
              </View>
              <Text style={[styles.paragraph, {marginTop: 20}]}>{getInterests()}</Text>
            </View>
          </View>       
        </LinearGradient>
      </TouchableOpacity>
      
      
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity>
        <View style={[styles.addFriend, styles.shadowProp]}>
          <Image source={require('../assets/Images/add-friend.png')} style={{width: 40, height: 40, resizeMode: 'contain', marginLeft: 5}}/>
        </View>  
      </TouchableOpacity> */}
        
      <AddFriendButton navigation={navigation}/>
      <View style={styles.search}>
        <Text style={styles.header}>Recommendations...</Text>
        <View style={styles.searchWrapper}>
          < TextInput style={styles.searchBar} placeholder="Search..."/>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => {setModalPopup(true)}}>
            <Text style={styles.filterText}>{filter.toUpperCase()}</Text>
            {showModal ? <Ionicons name="arrow-up" color={colors.rust}/>: <Ionicons name="arrow-down" color={colors.rust}/>}
        </TouchableOpacity>
        
      </View>
      <View style={styles.friendList}>
        <FlatList
          data={friends}
          renderItem={renderFriend}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal
            animationType={'fade'}
            transparent={true}
            visible={showModal}
            onRequestClose={() => {setModalPopup(!showModal)}}
        >
            <View style={styles.modal}>
              
              <SafeAreaView style={styles.modalBackground}>
                <TouchableOpacity style={[styles.closeIcon, {width: 30, height: 30}]} onPress={() => {setModalPopup(!showModal)}}>
                  <Ionicons name="close" color={colors.rust} size={30}/>
                </TouchableOpacity>
                <Text style={[styles.header, {marginTop: 35}]}>Sort Friends</Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY NAME (ALPHABETICAL)</Text>
                  {/* selecting filters and icon switching doesn't work yet */}
                  { (filter == 'name') ? <Ionicons name="radio-button-on" color={colors.rust} size={24}/> :
                  <Ionicons name="radio-button-off" color={colors.rust} size={24}/>}
                  {console.log(filter == 'name')}
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY DISTANCE</Text>
                  <Ionicons name="radio-button-off" color={colors.rust} size={24}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY LAST MET</Text>
                  <Ionicons name="radio-button-off" color={colors.rust} size={24}/>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY NUMBER OF MEMORIES</Text>
                  <Ionicons name="radio-button-off" color={colors.rust} size={24}/>
                </View>
              </SafeAreaView>
            </View>
        </Modal>
    </SafeAreaView>
  );
}

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center'
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    searchBar: {
      marginTop: '2%',
      borderColor: colors.rust,
      borderWidth: 1,
      borderRadius: 5,
      width: '90%',
      height: '45%',
      paddingLeft: 3,
      backgroundColor: '#F8F7F7'
    },
    searchWrapper: {
      alignItems: 'center',
    },
    header: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 24 / fontScale,
      marginTop: '4%',
      marginLeft: '5%',
      textAlign: 'left'
    },
    search: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20 / fontScale,
      width: '100%',
      height: '20%',
      borderBottomColor: colors.lightGray,
      borderBottomWidth: 2
    },
    filterButton: {
      backgroundColor: colors.himalayan,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 25,
      marginRight: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: '-5%',
      flexDirection: 'row',
    },
    filterText: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 12 / fontScale,
      marginRight: 5,
    },
    paragraph: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 14 / fontScale,
    },  
    boldParagraph: {
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      fontSize: 14 / fontScale,
    },
    friendList: {
      alignItems: 'center',
      flex: 1,
      width: '90%',
      marginTop: 15,
    },
    friendContainer: {
      width: windowWidth * 0.9,
      padding: 1,
      marginVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    innerContainer: {
      width: '100%',
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 5,

    },
    friendHeader: {
      fontFamily: 'Inter-Bold',
      fontSize: 24 / fontScale,
      color: colors.rust,
    }, 
    modal: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'flex-end',
    },
    modalBackground: {
      backgroundColor: 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingBottom: 60,
    },
    modalText: {
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      fontSize: 16 / fontScale,
    },
    modalRow: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: '5%', 
      alignItems: 'center',
      marginTop: 20,
    },
    closeIcon: {
      position: 'absolute',
      top: windowWidth * 0.05,
      left: windowWidth * 0.90,
    },
    addFriend: {
      width: 65,
      height: 65,
      borderRadius: '50%',
      backgroundColor: colors.budder,
      position: 'absolute',
      top: '95%',
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
  
