import { Text, View } from 'react-native';
import React from 'react';
import Home from './components/Home'
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Header from './components/Header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Scoreboard from './components/Scoreboard';

const Tab = createBottomTabNavigator();

export default function App() {



  return (
    <NavigationContainer>
    
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{tabBarStyle: {display: "none"}}}/>
        <Tab.Screen name='Gameboard' component={Gameboard}/>
        <Tab.Screen name='Scoreboard' component={Scoreboard}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}
