import React from "react";
import Home from "../screens/home";
import Profile from "../screens/profile";
import ChangeAddress from "../screens/changeAddress";
import ChangePassword from "../screens/changePassword";
import ManageAddress from "../screens/manageAddress";
import UserInfo from "../screens/userInfo";
import Wallet from "../screens/wallet";
import ManageOrders from "../screens/ManageOrders";
import Cart from "../screens/Cart";
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
    },
    ManageOrders: {
      screen: ManageOrders
    },
    Cart: {
      screen: Cart
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppStack;
