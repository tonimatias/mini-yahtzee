import { View, Text } from "react-native";
import React from 'react';
import styles from '../Styles/Style';
import Header from "./Header";


export default Scoreboard = () => {
    return (
        <View style={styles.header}>
            <Header />
            <Text style={styles.title}>Mini-Yahtzee</Text>
        </View>
    )
}