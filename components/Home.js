import { View, Text, Pressable, Keyboard, TextInput } from "react-native";
import React, { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Styles/Style';
import Header from "./Header";
import Footer from "./Footer";


export default Home = ( {navigation}) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }


    return ( 
        <View style={styles.container}>
            <Header />
            <MaterialCommunityIcons name="information-outline" size={60} style={styles.infoIcon} />
            { !hasPlayerName ?
            <>
                <Text style={styles.home}>For scoreboard enter your name:</Text>
                <View style={styles.playerTextInput}>
                    <TextInput onChangeText={setPlayerName} autoFocus={true}></TextInput>
                </View>
                <Pressable 
                style={styles.homeOkButton}
                onPress={() => handlePlayerName(playerName)}>
                <Text>OK</Text>
                </Pressable>
            </>
            :
            <>
                <Text style={styles.rulesTitle}>Rules of the game</Text>
                <Text style={styles.rules}>THE GAME: Upper section of the classic Yahtzee dice game. You have 5 dices and for the every dice you have 3 throws. After each throw you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn you must select your points from 1 to 6. Game ends when all points have been selected. The order for selecting those is free.</Text>
                <Text style={styles.rules}>POINTS: After each turn game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game you can not select same points from 1 to 6 again.</Text>
                <Text style={styles.rules}>GOAL: To get points as much as possible. 63 points is the limit of getting bonus which gives you 50 points more</Text>
                <Text style={styles.glPLayer}>Good luck, {playerName}!</Text>
                <Pressable 
                    onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                    <Text style={styles.homeOkButton}>PLAY</Text>
                </Pressable>
            </>
            }
            <Footer />
        </View>
    )
}