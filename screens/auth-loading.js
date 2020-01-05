import React from 'react';
import {
    AsyncStorage,
} from 'react-native';
import * as Font from 'expo-font';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
export default class AuthLoading extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        // await Font.loadAsync({
        //     Roboto: require("native-base/Fonts/Roboto.ttf"),
        //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        // });
        const authToken = await AsyncStorage.getItem('authToken');
        this.props.navigation.navigate(authToken ? 'AppStack' : 'AuthStack');
    };
    render() {
        return (
            <CustomActivityIndicator/>
        );
    }
}