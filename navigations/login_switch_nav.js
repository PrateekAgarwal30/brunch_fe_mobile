import React from "react";
import { Text } from "react-native";
import Home from "../screens/home";
import Login from "../screens/login";
import Register from "../screens/register";
import Profile from "../screens/profile";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

export const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    }
  },
  {
      initialRouteName: "Home"
  }
);
export const LoginSwitchNavigator = createSwitchNavigator(
    {
        HomeStack: {
            screen: HomeStackNavigator
        },
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    },
    {
        initialRouteName: "Login"
    }
);
