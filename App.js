import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from "./navigations/LoginSwitchNav";
import store from "./redux/store";
import { Provider } from "react-redux";
import NetworkInfoHOC from "./components/NetworkContext";
const AppContainer = createAppContainer(AppNavigator);
const NetworkInfoProvider = NetworkInfoHOC(AppContainer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NetworkInfoProvider/>
      </Provider>
    );
  }
}
