import { View, Text } from "react-native";
import React from 'react';
import styles from '../Styles/Style';


export default Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.author}> Author: Toni Leinonen</Text>
        </View>
    )
}