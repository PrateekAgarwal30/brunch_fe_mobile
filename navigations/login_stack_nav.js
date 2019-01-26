import React from 'react';
import {Text} from 'react-native';
import Home from '../screens/home'
import Login from '../screens/login'
import {createStackNavigator} from 'react-navigation';

export const LoginStackNavigator = createStackNavigator({
    Home : {
        screen : Home 
    },
    Login : {
        screen : Login
    }
},{
    initialRouteName : "Login"
})