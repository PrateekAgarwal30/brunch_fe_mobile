import React from "react";
import Home from "../screens/home";
import Profile from "../screens/profile";
import ChangeAddress from "../screens/changeAddress";
import ChangePassword from "../screens/changePassword";
import ManageAddress from "../screens/manageAddress";
import GetLocation from "../screens/location"
import Drawer from "../screens/drawer";
import UserInfo from "../screens/userInfo"
import { createStackNavigator, createDrawerNavigator } from "react-navigation";


import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
        initialRouteName: "Home",
        contentComponent: Drawer,
        navigationOptions: ({ navigation }) => {
            return {
                title: "Home",
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.isDrawerOpen ? navigation.closeDrawer() : navigation.openDrawer()
                            }
                        }
                        style={{ padding: 5, marginLeft: 10 }}
                    ><Icon name="menu" style={{ color: '#fff' }} />
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: "#16235A"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            };
        }
    }
);

const AppStack = createStackNavigator(
    {
        DrawerNavigator: {
            screen: DrawerNavigator,

        },
        Profile: {
            screen: Profile
        },
        ChangeAddress: {
            screen: ChangeAddress
        },
        GetLocation: {
            screen: GetLocation
        },
        ChangePassword: {
            screen: ChangePassword
        },
        ManageAddress: {
            screen: ManageAddress
        },
        UserInfo: {
            screen: UserInfo
        }
    },
    {
        initialRouteName: "DrawerNavigator"
    }
);

export default AppStack;

