import { Ionicons } from '@expo/vector-icons';
import { AutoFocus } from 'expo-camera';
import {LinearGradient} from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, TextInput, useWindowDimensions, ScrollView } from 'react-native';
import {colors} from '../assets/Themes/colors'
import { brunchSFData } from '../assets/brunchSFData';

const windowWidth = Dimensions.get('window').width;

export default function ContactScreen({navigation, route}) {
    const item = route.params.item;
    const [where, setWhere] = useState(item.where);
    const [what, setWhat] = useState(item.tags);
    const [message, setMessage] = useState(item.message)
    const [edit, setEdit] = useState(false);

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

  
    return (
      <SafeAreaView style={styles.container}>
        
        <TouchableOpacity style={{width: 40, height: 40, marginLeft: 10, flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Suggestion')}>
          <Image source={require('../assets/Images/arrow-left.png')} style={{marginTop: 20, width: 30, height: 30, resizeMode: 'contain'}}/>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/Images/sparkles.png')} style={styles.sparkleImage}/>
          <Text style={styles.header}>CONTACTING {item.friend.toUpperCase()}</Text>
          <TouchableOpacity style={{width: windowWidth-40, alignItems: 'flex-end'}} onPress={() => setEdit(!edit)}>
            <Text style={[styles.paragraph, {textDecorationLine: 'underline', textAlign: 'left', lineHeight: 30}]}>
              {edit ? 'done':'edit'}
            </Text>  
          </TouchableOpacity>
          
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.boxContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.boxFill}>
              <Text style={styles.boldParagraph}>Where: </Text>
              {edit ? (
                <>
                  <TextInput 
                    style={[styles.paragraph2, {marginTop: -7}]}
                    onChangeText={setWhere}
                    value={where}
                    multiline={true}
                  />
                </>
              ):(
                <Text style={styles.paragraph2}>{where}</Text>
              )}
              
            </View>
          </LinearGradient>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.whatContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.whatFill}>
              <Text style={styles.boldParagraph}>What: </Text>
              {edit ? (
                <>
                  <TextInput 
                    style={[styles.paragraph2, {marginTop: -7}]}
                    onChangeText={setWhat}
                    value={what}
                    multiline={true}
                  />
                </>
              ):(
                <Text style={styles.paragraph2}>{what}</Text>
              )}
            </View>
          </LinearGradient>
          <LinearGradient 
              colors={[colors.budder, colors.maroon]}
              style={styles.messageContainer}
              start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}>
            <View style={styles.messageFill}>
              <Text style={styles.boldParagraph}>Message: </Text>
              {edit ? (
                <>
                  <TextInput 
                    style={[styles.paragraph2, {marginTop: -7}]}
                    onChangeText={setMessage}
                    value={message}
                    multiline={true}
                  />
                </>
              ):(
                <Text style={styles.paragraph2}>{message}</Text>
              )}
            </View>
          </LinearGradient>
          <TouchableOpacity style={styles.yellowButton}>
            <Text style={styles.sendText}>SEND PLAN</Text>
            <Image style={{width: 20, height: 20, marginLeft:20, resizeMode: 'contain'}}
                    source={require('../assets/Images/arrow-right.png')}/>
          </TouchableOpacity>
        </View>
        
      </SafeAreaView>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 30 / fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
      marginTop: 40,
    },
    subHeader: {
      fontSize: 20/fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      lineHeight: 20,
    },
    paragraph2: {
      marginTop: 1,
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      lineHeight: 20,
      width: '70%'
    },
    boldParagraph: {
      fontSize: 16 / fontScale,
      fontFamily: 'Inter-Bold',
      color: colors.rust,
      lineHeight: 20,
    },
    sparkleImage: {
      width: 130,
      height: 185,
      marginTop: 40,
    },
    boxContainer: {
      width: windowWidth - 40,
      padding: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      height: 80,
    },
    boxFill: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      paddinBottom: 0,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
    },
    whatContainer: {
      width: windowWidth - 40,
      padding: 1,
      minHeight: 50,
      marginTop: -1,
      flexDirection: 'row'
    },
    whatFill: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      flexDirection: 'row'
    },
    messageContainer: {
      width: windowWidth - 40,
      padding: 1,
      height: 80,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      marginTop: -1,
    },
    messageFill: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      flexDirection: 'row'
    },
    yellowButton: {
      paddingLeft: 30,
      paddingRight: 25,
      height: 51,
      borderRadius: 26,
      backgroundColor: colors.budder,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: '10%'
    },
    sendText: {
      fontSize: 20 / fontScale,
      fontFamily: 'Inter-Regular',
      color: colors.rust,
      textAlign: 'center'
    }
  });
  