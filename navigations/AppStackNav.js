import React from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ChangeAddress from "../screens/ChangeAddress";
import ChangePassword from "../screens/ChangePassword";
import ManageAddress from "../screens/ManageAddress";
import UserInfo from "../screens/UserInfo";
import Wallet from "../screens/Wallet";
import { createStackNavigator } from "react-navigation";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    },
    ChangeAddress: {
      screen: ChangeAddress
    },
    ChangePassword: {
      screen: ChangePassword
    },
    ManageAddress: {
      screen: ManageAddress
    },
    UserInfo: {
      screen: UserInfo
    },
    Wallet: {
      screen: Wallet
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppStack;
