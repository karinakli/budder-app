import {LinearGradient} from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {colors} from '../assets/Themes/colors'

export default function DefaultScreen({navigation}) {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale)
    return (
      <View style={styles.container}>
        <LinearGradient 
        colors={['#FFF9F5', '#FFD883', '#FFCB58']}
        locations={[0,0.8, 0.9]}
        style={styles.background}>
          <Image source={require('../assets/budder-logo.png')}/>
          <Text style={styles.valueProp}>MAKE MEMORIES TOGETHER</Text>
          <TouchableOpacity style={styles.whiteButton} onPress={() => navigation.replace("Login")} >
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 24 / fontScale, color: colors.rust}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.yellowButton} onPress={() => navigation.navigate("Signup")}>
            <Text style={{fontFamily: 'Inter-Regular', fontSize: 24 / fontScale, color: colors.rust}}>Sign Up</Text>
          </TouchableOpacity>
      </LinearGradient>
      </View>
    );
  }

  const makeStyles = fontScale => StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    whiteButton: {
      width: '60%', 
      height: 51,
      borderRadius: 26,
      marginTop: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    yellowButton: {
      width: '60%', 
      height: 51,
      borderRadius: 26,
      marginTop: '10%',
      backgroundColor: colors.budder,
      justifyContent: 'center',
      alignItems: 'center'
    },
    valueProp: {
      fontFamily: 'Inter-Bold', 
      color: colors.rust,
      fontSize: 20 / fontScale,
      marginTop: 20,
    }
  });
  