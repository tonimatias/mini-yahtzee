import { View, Text, Button } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY } from '../constants/Game';
import { DataTable } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Styles/Style';
import Header from "./Header";
import Footer from "./Footer";


export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                tmpScores.sort((a, b) => b.points - a.points);
                setScores(tmpScores.slice(0, 7)); // Show only the top 7 scores
            } else {
                setScores([]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScores([]);
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <View>
            <Header />
            
            <MaterialCommunityIcons name="trophy" size={60} style={styles.trophyIcon}></MaterialCommunityIcons>
            <Text style={styles.topSeven}>Top Seven</Text>
            {scores.length > 0 ? (
                <View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Player</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Title>Time</DataTable.Title>
                            <DataTable.Title>Points</DataTable.Title>
                        </DataTable.Header>

                        {scores.map((player, i) => (
                            <DataTable.Row key={i}>
                                <DataTable.Cell>{i + 1}. {player.name}</DataTable.Cell>
                                <DataTable.Cell>{player.date}</DataTable.Cell>
                                <DataTable.Cell>{player.time}</DataTable.Cell>
                                <DataTable.Cell>{player.points}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                    <Button title="Clear Scoreboard" onPress={clearScoreboard} />
                </View>
            )
                :
                (
                    <Text style={styles.empty}>Scoreboard is empty</Text>
                )}
            <Footer />
        </View>

    )
}