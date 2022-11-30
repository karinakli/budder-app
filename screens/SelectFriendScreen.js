import { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, SectionList, TextInput, useWindowDimensions, SafeAreaView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function SelectFriendScreen({navigation}) {
    const tempData = [
        {title: 'A', data: ['Amanda', 'Andrew', 'Alex']}, {title: 'B', data: ['Brandon', 'Bianca']}, {title: 'C', data: ['Carissa', 'Caitlyn', 'Carl']},
        {title: 'D', data: ['Dylan', 'Derek', 'Diana']}, {title: 'E', data: ['Ethan', 'Evan', 'Eli']}, {title: 'F', data: ['Fiona', 'Felix', 'Fernando']},
        {title: 'G', data: ['Gavin', 'Graham', 'Gina']}, {title: 'H', data: ['Hannah', 'Harrison', 'Haley']}, {title: 'I', data: ['Isabella', 'Isaac', 'Ian']},
    ]

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const ContactItem = ({name}) => {
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
        </View>
    }

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
            <SectionList 
                sections={tempData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <ContactItem name={item} />}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={styles.header}>{title}</Text>
                )}
            />
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
        textAlign: 'left'
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
        fontSize: 24 / fontScale
      }
  });
  
