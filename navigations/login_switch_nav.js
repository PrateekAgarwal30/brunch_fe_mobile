import React from 'react';
import {Text} from 'react-native';
import Home from '../screens/home'
import Login from '../screens/login'
import {createSwitchNavigator} from 'react-navigation';

export const LoginSwitchNavigator = createSwitchNavigator({
    Home : {
        screen : Home 
    },
    Login : {
        screen : Login
    }
},{
    initialRouteName : "Login"
})