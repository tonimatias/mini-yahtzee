import { View, Text } from "react-native";
import React from 'react';
import styles from '../Styles/Style';


export default Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Mini-Yahtzee</Text>
        </View>
    )
}