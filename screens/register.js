import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Button,
  TouchableHighlight,
  TextInput, AsyncStorage
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Constants } from "expo";
import { register, textChange } from "../redux/actions";
// import {  } from "native-base";
class Register extends React.Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    validEmail: null,
    validPassword: null,
    validConfirmPassword: null
  };

  _register = async (x) => {
    try {
      await this.props.register(this.state.email, this.state.password)
      const a = await AsyncStorage.getItem('authToken');
      if (x) {
        this.props.navigation.navigate("AppStack");
      }
    } catch (error) {
      console.log("REGISTER ERROR", error);
    }
  };
  _validEmailInput = x => {
    if (this.props.user.err)
      this.props.textChange();
    reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      ...this.state,
      email: x,
      validEmail: reg.test(x) != 0,
      error: null
    });
    // console.log(reg.test(x) != 0);
  };
  _validConfirmPasswordInput = x => {
    if (this.props.user.err)
      this.props.textChange();
    if (x.length >= 5 && x === this.state.password) {
      this.setState({
        ...this.state,
        confirmPassword: x,
        validConfirmPassword: true,
        error: null
      });
    } else {
      this.setState({
        ...this.state,
        confirmPassword: x,
        validConfirmPassword: false,
        error: null
      });
    }
  };
  _validPasswordInput = x => {
    if (this.props.user.err)
      this.props.textChange();
    if (x.length >= 5) {
      this.setState({
        ...this.state,
        password: x,
        validPassword: true,
        error: null
      });
    } else {
      this.setState({
        ...this.state,
        password: x,
        validPassword: false,
        error: null
      });
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.logoWrapper}>
          <Text style={styles.welcomeText}>Welcome to Brunch App</Text>
          <Text style={{ color: "red" }}>{this.props.user.err}</Text>
          <TextInput
            style={styles.textWrapper}
            placeholder="Email Id"
            value={this.state.email}
            onChangeText={this._validEmailInput}
          />
          <TextInput
            style={styles.textWrapper}
            placeholder="Password"
            value={this.state.password}
            onChangeText={this._validPasswordInput}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textWrapper}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={this._validConfirmPasswordInput}
            secureTextEntry={true}
          />
          <TouchableHighlight
            style={styles.loginWrapper}
            onPress={this._register}
            disabled={
              !(
                this.state.validEmail &&
                this.state.validPassword &&
                this.state.validConfirmPassword
              )
            }
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
          <View style={styles.registerWrapper}>
            <Text style={{ fontSize: 16, marginRight: 50, color: "white" }}>
              Already have Account ?
            </Text>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  textDecorationLine: "underline"
                }}
              >
                Login
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
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
  register: register,
  textChange: textChange
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);
