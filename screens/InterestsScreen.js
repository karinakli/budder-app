import { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, Pressable, FlatList} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../assets/Themes/colors'

export default function InterestsScreen({navigation}) {
    const [selectedInterests, setSelectedInterests] = useState([])
    const [selectedMusic, setSelectedMusic] = useState([])
    const [selectedFoods, setSelectedFoods] = useState([])
    const data = {
        interests: ["Cooking", "Traveling", "Art", "Gaming", "Dance", "Photography", "Baking", "Hiking", "Gym"],
        music: ["Pop", "Hip Hop", "EDM", "Rock", "Country", "Classical", "Jazz", "R&B", "Latin", "Kpop"],
        foods: ["Mexican", "Italian", "Chinese", "Japanese", "Thai", "Indian", "American", "French", "Greek", "Korean"], 
    }

    const listInterests = data.interests.map((item) =>
        <Pressable onPress={() => setSelectedInterests(item)}>
            <View style={{marginHorizontal: 5, marginVertical: 2}}>
                <View style={styles.itemContainer}>
                    <Text style={styles.paragraph}>{item}</Text>
                </View>
            </View>
            
        </Pressable>
    );
    const listMusic = data.music.map((item) =>
        <Pressable onPress={() => setSelectedMusic(item)}>
            <View style={styles.itemContainer}>
                <Text style={styles.paragraph}>{item}</Text>
            </View>
        </Pressable>
    );
    const listFoods = data.foods.map((item) =>
        <Pressable onPress={() => setSelectedFoods(item)}>
            <View style={styles.itemContainer}>
                <Text style={styles.paragraph}>{item}</Text>
            </View>
        </Pressable>
    );

    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
            <View style={{...StyleSheet.absoluteFill, backgroundColor: colors.budder, width: '50%'}}/>
        </View>
        <Text style={styles.paragraph}>Fill out your interests so we can customize your friendship recommendations!</Text>
        <Text style={styles.header}>INTERESTS/HOBBIES</Text>
        {/* <FlatList
            data={data.interests}
            renderItem={renderItem}
            horizontal={true}
        /> */}
        <Text>{listInterests}</Text>

        <Text style={styles.header}>MUSIC TASTE</Text>
        <Text>{listMusic}</Text>
        <Text style={styles.header}>FAVORITE FOODS</Text>
        <Text>{listFoods}</Text>

        {(selectedInterests && selectedMusic && selectedFoods) ? (
            <LinearGradient 
                style={styles.nextButton}
                colors={[colors.budder, colors.maroon]}
                start={{x:0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                location={[0, 0.8]}>
                <Pressable style={styles.nextButtonFilled} onPress={() => navigation.navigate("AddProfile")}>
                    <Image source={require('../assets/Images/arrow-right.png')}/>
                </Pressable>
            </LinearGradient>
            
        ) : (
            <Pressable style={styles.nextButton}>
                <Image source={require('../assets/Images/arrow-right.png')}/>
            </Pressable>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
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
    },
    header: {
        fontFamily: 'Inter-Bold',
        color: colors.rust,
        fontSize: 20,
        marginVertical: '5%',
        textAlign: 'left'
    },
    paragraph: {
        fontFamily: 'Inter-Regular',
        color: colors.rust,
        fontSize: 16,
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
    itemContainer: {
        backgroundColor: colors.himalayan,
        padding: 10,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
