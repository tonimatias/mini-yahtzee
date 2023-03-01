import { Text, View } from 'react-native';
import React from 'react';
import Home from './components/Home'
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Header from './components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Scoreboard from './components/Scoreboard';

const Tab = createBottomTabNavigator();

export default function App() {



  return (
    <NavigationContainer>
    
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{tabBarStyle: {display: "none"}, tabBarIcon: () =>  <MaterialCommunityIcons name='information-outline' size={30} color={'#39b2ee'}/>} }/>
        <Tab.Screen name='Gameboard' component={Gameboard} options={{tabBarIcon: () =>  <MaterialCommunityIcons name='dice-multiple-outline' size={30} color={'#39b2ee'}/>}}/>
        <Tab.Screen name='Scoreboard' component={Scoreboard} options={{tabBarIcon: () =>  <MaterialCommunityIcons name='human-male-board-poll' size={30} color={'#39b2ee'}/>}}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}
