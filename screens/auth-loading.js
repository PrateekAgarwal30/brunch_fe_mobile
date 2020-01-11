import React from "react";
import { AsyncStorage } from "react-native";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
export default class AuthLoading extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      this.props.navigation.navigate(authToken ? "AppDrawerNav" : "AuthStack");
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return <CustomActivityIndicator />;
  }
}
