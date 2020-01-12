import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { login, textChange } from "../redux/actions";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Card, Button } from "native-base";
import * as Animatable from "react-native-animatable";
class Login extends React.Component {
  state = {
    validEmail: true,
    validPassword: true,
    email: "P2@gmail.com",
    password: "12345",
    showPassword: false
  };
  componentDidMount() {}
  _checkLogin = async () => {
    console.log("Clicked");
    try {
      await this.props.login(this.state.email, this.state.password);
      if (await AsyncStorage.getItem("authToken")) {
        this.props.navigation.navigate("AppStack");
      }
    } catch (error) {
      console.log("Error ", error);
      ToastAndroid.show("Server down. Please try later", ToastAndroid.SHORT);
    }
  };
  _validEmailInput = x => {
    if (this.props.user.err) this.props.textChange();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
    const { err } = this.props.user;
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={165}
        extraScrollHeight={45}
        style={{ flex: 1 }}
      >
        <View style={{ backgroundColor: "#1721AC", flex: 1 }}>
          <View
            animation="zoomIn"
            iterationCount={100}
            style={{
              // marginTop: 200,
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animatable.Image
              style={{
                width: 100,
                height: 100
              }}
              source={require("./../assets/logo.png")}
              animation="zoomIn"
              iterationCount={1}
            />
            <Animatable.Text
              animation="zoomIn"
              iterationCount={1}
              style={{ fontSize: 24 }}
            >
              Brunch
            </Animatable.Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              flex: 1,
              paddingTop: 25
            }}
          >
            <View
              style={{
                width: "90%",
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 20 }}>
                Welcome to Brunch
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "100",
                  marginTop: 30,
                  marginBottom: 10
                }}
              >
                Sign in to continue
              </Text>
              {err ? (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "100",
                    color: "red"
                  }}
                >
                  {err}
                </Text>
              ) : null}

              <Card
                style={{
                  elevation: 10,
                  borderRadius: 10,
                  flexDirection: "row"
                }}
              >
                <Icon
                  name="ios-mail"
                  size={25}
                  color="#000"
                  style={{ alignSelf: "center", marginLeft: 15 }}
                />
                <TextInput
                  style={styles.textWrapper}
                  placeholder="Email Id"
                  value={this.state.email}
                  onChangeText={this._validEmailInput}
                />
              </Card>
              <Card
                style={{
                  elevation: 10,
                  borderRadius: 10,
                  flexDirection: "row"
                }}
              >
                <Icon
                  name="ios-lock"
                  size={25}
                  color="#000"
                  style={{ alignSelf: "center", marginLeft: 15 }}
                />
                <TextInput
                  style={styles.textWrapper}
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={this._validPasswordInput}
                  secureTextEntry={!this.state.showPassword}
                />
                <Button
                  transparent
                  onPress={() => {
                    this.setState({
                      ...this.state,
                      showPassword: !this.state.showPassword
                    });
                  }}
                  style={{ alignSelf: "center" }}
                >
                  <Icon
                    name={this.state.showPassword ? "md-eye-off" : "md-eye"}
                    size={25}
                    color="#000"
                  />
                </Button>
              </Card>
              <Card
                style={{
                  elevation: 10,
                  borderRadius: 10,
                  flexDirection: "row",
                  marginTop: 30
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#1721AC",
                    justifyContent: "center",
                    flex: 1
                  }}
                  onPress={this._checkLogin}
                  // disabled={true}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "800", color: "white" }}
                  >
                    Login
                  </Text>
                </Button>
              </Card>
              <Text
                style={{
                  fontSize: 18,
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                Don't have a Account ?
              </Text>
              <Button
                bordered
                dark
                style={{
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 6,
                  width: "100%"
                }}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#A1A1A5" }}
                >
                  Sign Up
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textWrapper: {
    padding: 15,
    display: "flex",
    fontSize: 18,
    zIndex: 10,
    width: "80%"
  }
});
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  login: login,
  textChange: textChange
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
