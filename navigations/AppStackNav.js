import React from "react";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Address from "../screens/address";
import ChangePassword from "../screens/changePassword";
import GetLocation from "../screens/location"
import { createStackNavigator } from "react-navigation";
export default AppStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Profile: {
            screen: Profile
        },
        Address: {
            screen: Address
        },
        GetLocation: {
            screen: GetLocation
        },
        ChangePassword: {
            screen: ChangePassword
        }
    },
    {
        initialRouteName: "Home"
    }
);