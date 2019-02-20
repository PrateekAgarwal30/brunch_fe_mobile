import React from "react";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Address from "../screens/address";
import ChangePassword from "../screens/changePassword";
import GetLocation from "../screens/location"
import Drawer from "../screens/drawer";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
const AppStack = createStackNavigator(
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
export default DrawerNavigator = createDrawerNavigator(
    {
        Drawer: {
            screen: AppStack
        }
    },
    {
        initialRouteName: "Drawer",
        contentComponent : Drawer
    }
);

 