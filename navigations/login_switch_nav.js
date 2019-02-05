import React from "react";
import { Text } from "react-native";
import Home from "../screens/home";
import Login from "../screens/login";
import Register from "../screens/register";
import Profile from "../screens/profile";
import Address from "../screens/address";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    },
    Address: {
      screen: Address
    }
  },
  {
    initialRouteName: "Home"
  }
);
export const LoginSwitchNavigator = createSwitchNavigator(
         {
           HomeStack: {
             screen: AppNavigator
           },
           Login: {
             screen: Login
           },
           Register: {
             screen: Register
           },
           Address1: {
             screen: Address
           }
         },
         {
           initialRouteName: "Login"
         }
       );
