import React from "react";
import { AsyncStorage,Alert } from "react-native";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import * as Font from 'expo-font'; 
export default class AuthLoading extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
  }
   componentDidMount(){
     this._loadFontAsync();
  }
  _loadFontAsync = async () => {
    Font.loadAsync({
      'diavlo': require("../assets/Diavlo.ttf")
    }).then(async ()=>{
      console.log('Font Loaded');
      const authToken = await AsyncStorage.getItem("authToken");
      this.props.navigation.navigate(authToken ? "AppDrawerNav" : "AuthStack");
    }).catch(()=>{
      Alert.alert("Oops Something went wrong.\nPlease restart the App");
    });
  }
  render() {
      return <CustomActivityIndicator />;
  }
}
