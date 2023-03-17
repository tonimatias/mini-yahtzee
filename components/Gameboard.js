import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../Styles/Style';
import Header from './Header';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    const [scores, setScores] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [bonusPointsAdded, setBonusPointsAdded] = useState(false);

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
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

    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={'points' + spot}>
                <Text key={"points" + pointsRow} style={styles.points}> {getSpotTotal(spot)}</Text>
            </Col>
        )
    }


    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
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
    // This will be done once when entering to gameboard first time
    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
            getScoreboardData();
        }
    }, []);

    // This will be done when number of throws changes
    useEffect(() => {
       
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points');
        }
        else if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
        // Points will be saved when all points from bottom row have been selected
        else if (selectedDicePoints.every(x => x)) {
            savePlayerPoints();
        }

    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        if (scores >= 63 && !bonusPointsAdded) {
          setScores(scores + BONUS_POINTS);
          setBonusPointsAdded(true);
        }
      }, [scores, bonusPointsAdded]);


    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "steelblue";
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "black" : "steelblue";
    }

    function selectDicePoints(i) {
        let selected = [...selectedDices];
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];
        if (!selectedPoints[i]) {
            selectedPoints[i] = true;
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
            points[i] = nbrOfDices * (i + 1);
            setDicePointsTotal(points);
        }

        const newTotalScore = points.reduce((sum, value) => sum + value, 0);
        setTotalScore(newTotalScore);
        selected.fill(false);
        setSelectedDices(selected);
        setSelectedDicePoints(selectedPoints);
        // setNbrOfThrowsLeft(NBR_OF_THROWS);
        // Check if all rows have been selected
        if (selectedPoints.every((x) => x)) {
            setNbrOfThrowsLeft(0); // Set number of throws to 0 to prevent more throws
            return;
        }

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
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        setDiceSpots(spots);
        setStatus("Select and throw dices again!");
    }

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const getCurrentDate = () => {

        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        return date + '.' + month + '.' + year;
    }

    const getTime = () => {
        const hours = new Date().getHours();
        const min = new Date().getMinutes(); 

        return hours + ':' + min;
    }

    const savePlayerPoints = async () => {
        const playerPoints = {
            name: playerName,
            date: getCurrentDate(),
            time: getTime(),
            points: totalScore
        }
        
        try {
            const newScore = [...scores, playerPoints];
            if (newScore >= 63) {
                newScore + BONUS_POINTS; // En tiedä miten saadaan bonuspisteet siirrettyä scoreboardiin....
            }
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
            //checkBonusPoints();
        } catch (error) {
            console.log("Save error: " + error.message);
        }
    }


    const checkBonusPoints = () => {
        if (totalScore < 63) {
            setTotalScore(totalScore);
        }
        else {
            setTotalScore(totalScore + BONUS_POINTS);
        }
    }


    return (
        <View style={styles.gameboard}>
            <Header />
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
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

            {totalScore < 63 ?
                <>
                    <Text style={styles.total}>Total: {totalScore}</Text>
                    <Text>You are {(BONUS_POINTS_LIMIT - totalScore)} away from bonus</Text>
                </>
                :
                <>
                    <Text style={styles.total}>Total: {(totalScore + BONUS_POINTS)}</Text>
                    <Text>You got the bonus! 50 points added</Text>
                </>}
            
            <Text style={styles.glPLayer}>Player: {playerName}</Text>
            <Footer />
        </View>
    )
}