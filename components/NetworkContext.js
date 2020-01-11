import React from "react";
import NetInfo from "@react-native-community/netinfo";
const defaultValue = {
  details: {
    isConnectionExpensive: false
  },
  isConnected: false,
  type: "mobile"
};
export const {
  Provider: NetworkProvider,
  Consumer: NetworkConsumer
} = React.createContext(defaultValue);

const NetworkInfoHOC = WrapperComponent => {
  class Child extends React.Component {
    state = defaultValue;
    componentDidMount() {
      this.unsubscribe = NetInfo.addEventListener(state => {
        if (JSON.stringify(this.state) !== JSON.stringify(state)) {
          console.log("State Changed", state);
          this.setState(state);
        }
      });
    }
    componentWillUnmount() {
      console.log("unsubscribed");
      this.unsubscribe();
    }
    render() {
      return (
        <NetworkProvider value={this.state}>
          <WrapperComponent />
        </NetworkProvider>
      );
    }
  }
  return Child;
};
export default NetworkInfoHOC;
