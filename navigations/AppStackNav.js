import React from "react";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Address from "../screens/address";
import ChangePassword from "../screens/changePassword";
import GetLocation from "../screens/location"
import Drawer from "../screens/drawer";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
        initialRouteName: "Home",
        contentComponent: Drawer
    }
);

export default AppStack = createStackNavigator(
    {
        DrawerNavigator: {
            screen: DrawerNavigator
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
        initialRouteName: "DrawerNavigator"
    }
);


 