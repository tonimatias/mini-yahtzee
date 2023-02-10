import { View, Text, TeaxtInput, Pressable, Keyboard, TextInput } from "react-native";
import React, { useState } from 'react';
import styles from '../Styles/Style';


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
            <Text>HOME :DDDD XDXDXD</Text>
            { !hasPlayerName ?
            <>
                <Text>For scoreboard enter your name:</Text>
                <TextInput onChangeText={setPlayerName} autoFocus={true}></TextInput>
                <Pressable onPress={() => handlePlayerName(playerName)}>
                <Text>OK :D</Text>
                </Pressable>
            </>
            :
            <>
                <Text>Rules of the game here....</Text>
                <Text>Good luck, {playerName}</Text>
                <Pressable onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                <Text>PLAY</Text>
                </Pressable>
            </>
            }
        </View>
    )
}