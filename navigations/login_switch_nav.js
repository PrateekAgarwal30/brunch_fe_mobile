import React from "react";
import AuthStack from './AuthStackNav';
import AppStack from "./AppStackNav";
import { createSwitchNavigator} from "react-navigation";
import AuthLoading from '../screens/auth-loading';

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    AppStack: AppStack,
    AuthStack: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);