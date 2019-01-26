import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { LoginSwitchNavigator } from "./navigations/login_switch_nav";
import { AppLoading, Asset, Font, Icon } from "expo";
const AppContainer = createAppContainer(LoginSwitchNavigator);
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState(
      {
        isLoadingComplete: true
      }
    )
  }
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <View><Text>Application is Loading</Text></View>
      );
    } else {
      return (
        <AppContainer />
      );
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
