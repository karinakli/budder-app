import { StyleSheet, View, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function SplashScreen({navigation}) {
    return (
      <View style={styles.container}>
      <LinearGradient 
        colors={['#FFF9F5', '#FFCB58']}
        locations={[0,0.7]}
        style={styles.background}>
          <Image source={require('../assets/budder-logo.png')}/>
      </LinearGradient>
      </View>
    );
  }

  const styles = StyleSheet.create({
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
  });
  