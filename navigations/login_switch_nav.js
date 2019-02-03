import React from 'react';
import { Text } from 'react-native';
import Home from '../screens/home'
import Login from '../screens/login';
import Register from '../screens/register';
import { createSwitchNavigator } from 'react-navigation';

export const LoginSwitchNavigator = createSwitchNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: 'locked-closed'
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: 'locked-closed'
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
            drawerLockMode: 'locked-closed'
        })
    }
}, {
        initialRouteName: "Login"
    })