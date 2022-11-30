import React, { Component } from 'react'
import { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, useWindowDimensions, Modal } from 'react-native'
import { colors } from '../assets/Themes/colors';


const AddFriendButton = ({navigation}) => {
    const [addFriendModal, setAddFriendModal] = useState(false);

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const navigateAddProfile = () => {
        navigation.navigate("SelectFriend");
        setAddFriendModal(false);
    }

    return (
    <>  
        <TouchableOpacity style={[styles.addFriend, styles.shadowProp]} onPress={() => setAddFriendModal(true)}>
            <Image source={require('../assets/Images/add-friend.png')} style={{width: 40, height: 40, resizeMode: 'contain', marginLeft: 5}}/>
        </TouchableOpacity>
        <Modal
            animationType={'fade'}
            transparent={true}
            visible={addFriendModal}
            onRequestClose={() => {setAddFriendModal(!addFriendModal)}}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => setAddFriendModal(false)}>
                <TouchableOpacity style={[styles.addFriendModal, styles.shadowProp]} onPress={() => setAddFriendModal(false)}>
                    <Image source={require('../assets/Images/add-friend.png')} style={{width: 40, height: 40, resizeMode: 'contain', marginLeft: 5}}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.profilePopup, styles.shadowProp]} onPress={() => navigateAddProfile()}>
                    <Text style={styles.header}>ADD FRIENDSHIP PROFILE</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    </>
    

    )
}

const makeStyles = fontScale => StyleSheet.create({
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
      addFriendModal: {
        width: 65,
        height: 65,
        borderRadius: '50%',
        backgroundColor: colors.budder,
        position: 'absolute',
        top: '81%',
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
    modalContainer: {
        flex: 1,
        backgroundColor: '#ffffffaa',
        justifyContent: 'flex-end',
    },
    profilePopup: {
        backgroundColor: colors.budder,
        padding: 20,
        width: 300,
        borderRadius: 30,
        position: 'absolute',
        top: '70%',
        left: '20%'
    },
    header: {
        fontFamily: 'Inter-Bold',
        fontSize: 20 / fontScale,
        color: colors.rust,
    }
})

export default AddFriendButton;
