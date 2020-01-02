import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { AppNavigator } from "./navigations/login_switch_nav";
// import { AppLoading, Asset, Font, Icon } from "expo";
import store from './redux/store';
import { Provider } from 'react-redux'
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}