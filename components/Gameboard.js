import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Styles/Style';
import Header from './Header';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT } from '../constants/Game';
import {Col, Grid} from 'react-native-easy-grid';
import Footer from './Footer';

let board = [];


export default Gameboard = ({ route }) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    // This array has the information whether dice is selected or not
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    // this array has the information whether the spot count has been selected or not
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    // This array has dice spots for a throw
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    // this array has total points different spot counts
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
            key={"row" + i}
            onPress={()=> selectDice(i)}>
                 <MaterialCommunityIcons
                    name={board[i]}
                    key={'row' + i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
    );
}

const pointsRow = [];

for(let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
        <Col key={'points' +  spot}>
            <Text key={"points" + pointsRow} style={styles.points}> {getSpotTotal(spot)}</Text>
        </Col>
    )
}


const buttonsRow = [];
for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
    buttonsRow.push(
    <Col key={'buttonsRow' + diceButton}>
        <Pressable key={'buttonsRow' + diceButton} onPress={() => selectDicePoints(diceButton)}>
            <MaterialCommunityIcons 
                name={'numeric-' + (diceButton + 1) + '-circle'}
                key={'buttonsRow' + diceButton}
                size={40}
                color={getDicePointsColor(diceButton)}>
            </MaterialCommunityIcons>
        </Pressable>
    </Col>
    )
}

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    },[])



   function getDiceColor(i){
    // if (board.every((val, i, arr) => val === arr[0])) {
    //     return "orange";
    // }
    // if {
    return selectedDices[i] ? "black" : "steelblue";
    //}
   }

   function getDicePointsColor(i){
    return selectedDicePoints[i] ? "black" : "steelblue";
   }

   function selectDicePoints(i) {
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    if (!selectedPoints[i]){
        selectedPoints[i] =  true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
    }
    selected.fill(false);
    setSelectedDices(selected);
    setSelectedDicePoints(selectedPoints);
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    return points[i];
   }

   function getSpotTotal(i) {
    return dicePointsTotal[i];
   }
   const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
   }

   
    const throwDices = () => {
        let spots = [...diceSpots];
    
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]){
                let randomNumber = Math.floor(Math.random() * 6 + 1 );
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus("Select and throw dices again!");
    }

    const checkWinner = () => {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        }
        else if (nbrOfThrowsLeft === 0){
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        }
        
        else {
            setStatus('Keep on throwing!');
        }
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft == NBR_OF_THROWS) {
            setStatus('Game has not started');
        }
        if (nbrOfThrowsLeft < 0){
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    },[nbrOfThrowsLeft]);



    return(
        <View style={styles.gameboard}>
            <Header />
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={()=>throwDices()}>
                   <Text style={styles.buttonText}>
                    Throw dices
                    </Text>
            </Pressable>
            <View style={styles.dicePoints}>
                <Grid>{pointsRow}</Grid>
            </View>
            <View style={styles.dicePoints}>
                <Grid>{buttonsRow}</Grid>
            </View>
            <Text style={styles.total}>Total:</Text>
            <Text>You are *points here* away from bonus</Text>
            <Text style={styles.glPLayer}>Player: {playerName}</Text>
            <Footer />
        </View>
    )
}



