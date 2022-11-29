import { useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, useWindowDimensions, Pressable} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors';
import { db, auth } from "../firebase"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const ListItem = (props) => {
    const {item} = props;
    const [pressed, setPressed] = useState(false);

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    async function onPress() {
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        if (!pressed) {
            await updateDoc(userRef, {
                interests: arrayUnion(props.name)
            });
        
        } else {
            await updateDoc(userRef, {
                interests: arrayRemove(props.name)
            });
        }
        setPressed(prevPressd => !prevPressd);
    }

    return (
        <Pressable onPress={onPress} >
            <View style={{marginHorizontal: 5, marginVertical: 5}}>
                <View style={{ backgroundColor : pressed ? colors.budder : colors.himalayan, 
                                padding: 10,
                                borderRadius: '50%',
                                alignItems: 'center',
                                justifyContent: 'center', }}>
                    <Text style={styles.paragraph}>{props.name}</Text>
                </View>
            </View>
            
        </Pressable>
    );
}

export default function InterestsScreen({navigation}) {
    const [selectedInterests, setSelectedInterests] = useState([])
    const [selectedMusic, setSelectedMusic] = useState([])
    const [selectedFoods, setSelectedFoods] = useState([])

    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale)

    const data = {
        interests: ["Cooking", "Traveling", "Art", "Gaming", "Dance", "Photography", "Baking", "Hiking", "Gym"],
        music: ["Pop", "Hip Hop", "EDM","Country", "Classical", "R&B", "Global"],
        foods: ["Mexican", "Italian", "Chinese", "Japanese", "Thai", "Indian", "American", "Greek", "Korean"], 
    }

    const listInterests = data.interests.map((item) =>
        <ListItem key={item} name={item}/>
    );
    const listMusic = data.music.map((item) =>
        <ListItem key={item} name={item}/>
    );
    const listFoods = data.foods.map((item) =>
        <ListItem key={item} name={item}/>
    );

    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
            <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '40%', borderRadius: 5}}/>
        </View>
        <Text style={styles.paragraph}>Fill out your interests so we can customize your friendship recommendations!</Text>
        <ScrollView>
            <Text style={styles.header}>INTERESTS/HOBBIES</Text>
            <Text>{listInterests}</Text>
            <Text style={styles.header}>MUSIC TASTE</Text>
            <Text>{listMusic}</Text>
            <Text style={styles.header}>FAVORITE FOODS</Text>
            <Text>{listFoods}</Text>    
        </ScrollView>

        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("AddProfile")}>
            <LinearGradient 
                style={styles.nextButtonFilled}
                colors={(selectedInterests && selectedMusic && selectedFoods) ? [colors.budder, colors.maroon] : ["#606060", "#606060"]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                <Image source={require('../assets/Images/arrow-right.png')}/>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

const makeStyles = fontScale => StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 25,
        backgroundColor: colors.white,
    },
    progressBar: {
        height: 7,
        flexDirection: "row",
        width: '100%',
        backgroundColor: colors.lightGray,
        marginBottom: 20,
        borderRadius: 5,
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20 / fontScale,
        marginVertical: '5%',
        textAlign: 'left'
    },
    paragraph: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16 / fontScale,
        textAlign: 'center'
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
    nextButtonFilled: {
        backgroundColor: '#C4C4C4',
        height: 67,
        width: 67,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        backgroundColor: colors.himalayan,
        padding: 10,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
