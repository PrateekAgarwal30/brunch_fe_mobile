import React from "react";
import { createAppContainer } from "react-navigation";
import {AppNavigator} from "./navigations/LoginSwitchNav";
import store from "./redux/store";
import { Provider } from "react-redux";
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
