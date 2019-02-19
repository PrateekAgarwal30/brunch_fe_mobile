import React from "react";
import Login from "../screens/login";
import Register from "../screens/register";
import { createSwitchNavigator} from "react-navigation";
export default AuthStack = createSwitchNavigator(
    {
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
