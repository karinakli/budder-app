import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, SectionList, TextInput, useWindowDimensions, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/Themes/colors'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function SelectFriendScreen({navigation}) {
    const DATA = [
        {title: 'A', data: [{name: 'Amanda', selected: true}, {name: 'Andrew', selected: false}, {name: 'Alex', selected: false}]}, 
        {title: 'B', data: [{name: 'Brandon', selected: false}, {name: 'Bianca', selected: false}]}, 
        {title: 'C', data: [{name: 'Cameron', selected: false}, {name: 'Catherine', selected: true}, {name: 'Caleb', selected: false}]},
        {title: 'D', data: [{name: 'Dylan', selected: false}]},
        {title: 'E', data: [{name: 'Ethan', selected: false}, {name: 'Ella', selected: false}, {name: 'Eli', selected: false}]},
        {title: 'F', data: [{name: 'Felix', selected: false}, {name: 'Faith', selected: false}]},
        {title: 'G', data: [{name: 'Gabriel', selected: false}, {name: 'Grace', selected: false}, {name: 'Gavin', selected: false}]},
        {title: 'H', data: [{name: 'Henry', selected: false}]},
        {title: 'I', data: [{name: 'Isaac', selected: false}, {name: 'Isabella', selected: false}, {name: 'Ian', selected: false}]},
        {title: 'J', data: [{name: 'Jacob', selected: false}, {name: 'Julia', selected: false}, {name: 'Jackson', selected: false}]},
    ]

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const HeaderItem = ({ title }) => (
      <Text style={styles.title}>{title}</Text>
    );
  
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.search}>
                <Text style={styles.header}>Select Friends To Create Profile</Text>
                <View style={styles.searchWrapper}>
                    <TextInput style={styles.searchBar} placeholder="Search..."/>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView style={{marginTop: 20, width: '100%', paddingHorizontal: '7%', height: '85%'}}>
              <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index} /* unique key for each item */
                renderItem={({ item }) => (
                  <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={require('../assets/Images/daniel.png')} style={{width: 30, height: 30, borderRadius: 25, marginHorizontal: 10}}/>
                      <Text style={styles.paragraph}>{item.name.toUpperCase()}</Text>
                    </View>
                    {/* TODO: update hardcoded data when clicked*/}
                    <TouchableOpacity>
                      {item.selected ? <Image source={require('../assets/Images/check-circle.png')}/>:<Image source={require('../assets/Images/circle.png')}/>}
                    </TouchableOpacity>
                  </View>
                  
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <HeaderItem title={title} />
                )}
              />  
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity style={[styles.yellowButton, styles.shadowProp]} 
                  onPress={() => navigation.navigate("AddFriend", {selectedFriends: ['Amanda', 'Catherine']})}>
                  <Text style={styles.buttonText}>BUILD FRIENDSHIP PROFILE</Text>
                </TouchableOpacity>
              </View>
              
            </SafeAreaView>
            
        </SafeAreaView>
      );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 25,
      backgroundColor: colors.white,
      alignItems: 'center',
    },
    searchBar: {
        marginTop: '2%',
        borderColor: colors.rust,
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        height: 30,
        paddingLeft: 3,
        backgroundColor: '#F8F7F7'
      },
      searchWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '5%'
      },
      header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 22 / fontScale,
        marginTop: '4%',
        marginLeft: '5%',
        textAlign: 'left',
      },
      search: {
        fontFamily: 'Inter-Bold', 
        color: colors.rust,
        fontSize: 20 / fontScale,
        width: '100%',
        height: '13%',
        borderBottomColor: colors.lightGray,
        borderBottomWidth: 2
      },
      cancelText: {
        fontFamily: 'Inter-Regular',
        color: '#5D7D8E',
        top: 3,
      },
      item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
      },
      title: {
        fontSize: 20 / fontScale,
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        backgroundColor: colors.white,
      },
      paragraph: {
        fontSize: 16 / fontScale,
        fontFamily: 'Inter-Regular',
        color: colors.rust,
      },
      yellowButton: {
        backgroundColor: colors.budder,
        padding: 10,
        width: 250,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        fontSize: 20 / fontScale,
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        textAlign: 'center'
      },
      shadowProp: {
        shadowColor: colors.darkGray,
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
    },
  });
  
