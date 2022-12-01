import { useEffect, useState } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Image, useWindowDimensions, Modal } from 'react-native';
import {colors} from '../assets/Themes/colors'

import Ionicons from '@expo/vector-icons/Ionicons'
import AddFriendButton from './AddFriendButton';

import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import distanceBetweenCoords from '../util';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function HomeComp({navigation}) {
  const filters = ['NAME', 'DISTANCE', 'LAST MET', 'MEMS']
  const [filter, setFilter] = useState('NAME');
  const [showModal, setModalPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  let latLong = [];

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale)

  const [friends, setFriends] = useState(null)
  const [friendsCopy, setFriendsCopy] = useState(null)

  useEffect(() => { loadProfilesFromFirebase() }, [])

  useEffect(() => {
    if (friends) {
      sortFriends()
    }
    setModalPopup(false)
  }, [filter])

  useEffect(() => {
    filterFriends()
    }, [searchQuery])


  const sortFriends = () => {
    if (filter === 'NAME') {
      setFriends(friends.sort((a, b) => (a.name > b.name) ? 1 : -1))
      setFriendsCopy(friends)
    } if (filter === 'DISTANCE') {
      setFriends(friends.sort((a, b) => (a.distance > b.distance) ? 1 : -1))
      setFriendsCopy(friends)
    } if (filter === 'LAST MET') {
      setFriends(friends.sort((a, b) => (Math.random() > 0.5) ? 1 : -1))
      setFriendsCopy(friends)
    } if (filter === 'MEMS') {
      setFriends(friends.sort((a, b) => (a.numMems > b.numMems) ? 1 : -1))
      setFriendsCopy(friends)
    }
  }

  const filterFriends = () => {
    if (friends) {
      if (searchQuery === '') {
        setFriends(friendsCopy)
      } else {
        setFriends(friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase())))
      }
    }
  }


  async function loadProfilesFromFirebase() {
    let responseObjects = []
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q,);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      if (doc.id !== auth.currentUser.uid) {
        responseObjects = [...responseObjects, data]
      } else {
        latLong = [data.lastLat, data.lastLong]
      }
    })
    transformServerResponseObjects(responseObjects)
      .then(newFriends =>{
        setFriends(newFriends)
        setFriendsCopy(newFriends)
      })
      .catch(err => console.log(err))
  }

  async function transformServerResponseObjects(responseObjects) {
    let newFriendObjects = []
    for (let i = 0; i < responseObjects.length; i++) {
      let friendResponse = responseObjects[i]
      let randomNumMems = Math.floor(Math.random() * 20)
      let newFriendObj = { name: 'N/A', distance: '', lastMet: '2022-11-28', numMems: randomNumMems, interests: [], image: require('../assets/Images/daniel.png')}
      newFriendObj.name = friendResponse.name
      newFriendObj.image = friendResponse.profilePhoto
      newFriendObj.address = friendResponse.address
      newFriendObj.interests = friendResponse.interests
      let distance = distanceBetweenCoords(latLong[0], friendResponse.lastLat, latLong[1], friendResponse.lastLong)
      newFriendObj.distance = distance
      newFriendObj.lat = friendResponse.lastLat
      newFriendObj.long = friendResponse.lastLong
      newFriendObjects = [...newFriendObjects, newFriendObj]
    }

    return newFriendObjects
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
                <Text style={styles.paragraph}>{item.address}</Text>
                <Text style={styles.boldParagraph}>{ (filter !== "DISTANCE") ? item.numMems + " mems": item.distance + " miles"}</Text>
              </View>
              <Text style={[styles.paragraph, {marginTop: 20}]}>{getInterests()}</Text>
            </View>
          </View>       
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <AddFriendButton navigation={navigation}/>
      <View style={styles.search}>
        <Text style={styles.header}>Recommendations...</Text>
        <View style={styles.searchWrapper}>
          < TextInput style={styles.searchBar} value={searchQuery} placeholder="Search..." onChangeText={(text) => setSearchQuery(text)}/>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => {setModalPopup(true)}}>
            <Text style={styles.filterText}>{filter}</Text>
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
            <View style={styles.modal} >
              
              <SafeAreaView style={styles.modalBackground}>
                <TouchableOpacity style={{width: 30, height: 30, marginLeft: "auto"}} onPress={() => {setModalPopup(!showModal)}}>
                  <Ionicons name="close" color={colors.rust} size={30} style={styles.closeIcon}/>
                </TouchableOpacity>
                <Text style={[styles.header, {marginTop: -10}]}>Sort Friends</Text>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY NAME (ALPHABETICAL)</Text>
                  <TouchableOpacity onPress={() => changeFilter('NAME')}>
                    <Ionicons name={(filter === 'NAME') ? "radio-button-on" : "radio-button-off"} color={colors.rust} size={24}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY DISTANCE</Text>
                  <TouchableOpacity onPress={() => changeFilter('DISTANCE')}>
                    <Ionicons name={(filter === 'DISTANCE') ? "radio-button-on" : "radio-button-off"} color={colors.rust} size={24}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY LAST MET</Text>
                  <TouchableOpacity onPress={() => changeFilter('LAST MET')}>
                    <Ionicons name={(filter === 'LAST MET') ? "radio-button-on" : "radio-button-off"} color={colors.rust} size={24}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalRow}>
                  <Text style={styles.modalText}>BY NUMBER OF MEMORIES</Text>
                  <TouchableOpacity onPress={() => changeFilter('MEMS')}>
                    <Ionicons name={(filter === 'MEMS') ? "radio-button-on" : "radio-button-off"} color={colors.rust} size={24}/>
                  </TouchableOpacity>
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
      right: windowWidth * 0.05,
    }
  });
  
