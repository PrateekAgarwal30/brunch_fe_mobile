import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import { login, textChange } from "../redux/actions";
import { ipAddress } from "../constants";
import { Constants } from "expo";
import { Ionicons as Icon } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'
const { width, height } = Dimensions.get("screen");
class Login extends React.Component {
  state = {
    validEmail: true,
    validPassword: true,
    email: "P2@gmail.com",
    password: "12345",
    showPassword: false
  };
  componentDidMount() {

  }
  _checkLogin = async () => {
    try {
      await this.props.login(this.state.email, this.state.password);
      if (await AsyncStorage.getItem('authToken')) {
        this.props.navigation.navigate("AppStack");
      }
    } catch (error) {
      console.log("Error ",error);
      ToastAndroid.show("Server down. Please try later",ToastAndroid.SHORT);
    };
  };
  _validEmailInput = x => {
    if (this.props.user.err) this.props.textChange();
    reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      ...this.state,
      email: x,
      validEmail: reg.test(x) != 0
    });
  };
  _validPasswordInput = x => {
    if (this.props.user.err) this.props.textChange();
    if (x.length >= 5) {
      this.setState({
        ...this.state,
        password: x,
        validPassword: true
      });
    } else {
      this.setState({
        ...this.state,
        password: x,
        validPassword: false
      });
    }
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Animatable.View animation="zoomIn" iterationCount={1}>
            <Image
              style={styles.logo}
              source={require("./../assets/logo.png")}
            />
          </Animatable.View>
          <Text style={styles.welcomeText}>Welcome to Brunch App</Text>
          <Text style={{ color: "red" }}>{this.props.user.err}</Text>
          <TextInput
            style={styles.textWrapper}
            placeholder="Email Id"
            value={this.state.email}
            onChangeText={this._validEmailInput}
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              style={{ fontSize: 16, flex: 8 }}
              placeholder="Password"
              value={this.state.password}
              onChangeText={this._validPasswordInput}
              secureTextEntry={!this.state.showPassword}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  ...this.state,
                  showPassword: !this.state.showPassword
                });
              }}
              style={{
                justifyContent: "flex-end",
                flex: 1,
                display: "flex",
                width: "10%"
              }}
            >
              <Icon
                name={this.state.showPassword ? "md-eye-off" : "md-eye"}
                size={32}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginWrapper}
            onPress={this._checkLogin}
          // disabled={!(this.state.validEmail && this.state.validPassword)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.registerWrapper}>
            <Text style={{ fontSize: 16, marginRight: 50, color: "white" }}>
              Don't have Account ?
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  textDecorationLine: "underline"
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>{JSON.stringify(this.props.user)}</Text>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: "#A4A4BF"
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 40
  },
  logoWrapper: {
    flex: 1,
    display: "flex",
    marginTop: 30,
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "300",
    color: "white",
    marginBottom: 40
  },
  loginWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    display: "flex",
    borderColor: "white",
    backgroundColor: "#595775",
    width: "80%"
  },
  textWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    display: "flex",
    borderColor: "white",
    backgroundColor: "#F1E0D6",
    width: "80%",
    marginBottom: 20,
    fontSize: 18
  },
  passwordWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    padding: 15,
    display: "flex",
    borderColor: "white",
    backgroundColor: "#F1E0D6",
    width: "80%",
    marginBottom: 20,
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    width: "100%",
    color: "white"
  },
  registerWrapper: {
    flexDirection: "row",
    padding: 15
  }
});
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  login: login,
  textChange: textChange
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
