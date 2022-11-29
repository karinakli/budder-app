import { StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {colors} from '../assets/Themes/colors'

export default function ConfirmationScreen({navigation}) {

    return (
        <View style={styles.container}>
          <View style={styles.progressBar}>
              <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '100%'}}/>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '60%'}}>
            <Image source={require('../assets/Images/all-set.png')}/>
            <Text style={styles.header}>All Set!</Text>
            <TouchableOpacity style={styles.yellowButton} onPress={() => navigation.replace("Home")}>
                <Text style={{fontFamily: 'Inter-Regular', fontSize: 20, color: colors.rust, paddingRight: 30}}>Let's Go!</Text>
                <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={require('../assets/Images/arrow-right.png')}/>
            </TouchableOpacity>
          </View>

        </View>
      );
  }

  const styles = StyleSheet.create({
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
        marginTop: '8%',
        textAlign: 'center'
    },
    paragraph: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        width: 300,
    },
    yellowButton: {
        paddingLeft: 30,
        paddingRight: 25,
        height: 51,
        borderRadius: 26,
        marginTop: '70%',
        backgroundColor: colors.budder,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
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
  