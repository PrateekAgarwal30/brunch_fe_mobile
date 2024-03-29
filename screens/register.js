import React from "react";
import { StyleSheet, View, Text, TextInput, AsyncStorage } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { register, textChange } from "../redux/actions";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Button } from "native-base";
import * as Animatable from "react-native-animatable";
import { withAppContextConsumer } from "../components/AppContext";
class Register extends React.Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    validEmail: null,
    validPassword: null,
    validConfirmPassword: null,
    mobileNo: null,
    validMobileNo: null
  };

  _register = async x => {
    try {
      await this.props.register(this.state.email, this.state.password);
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        console.log("authToken", authToken);
        this.props.navigation.navigate("AppStack");
      }
    } catch (error) {
      console.log("REGISTER ERROR", error);
    }
  };
  _validEmailInput = x => {
    if (this.props.user.err) this.props.textChange();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      ...this.state,
      email: x,
      validEmail: reg.test(x) != 0,
      error: null
    });
  };
  _validConfirmPasswordInput = x => {
    if (this.props.user.err) this.props.textChange();
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
    if (this.props.user.err) this.props.textChange();
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

  _validMobileInput = x => {
    if (this.props.user.err) this.props.textChange();
    if (x.length === 10 && +x > 999999999) {
      this.setState({
        ...this.state,
        mobileNo: x,
        validMobileNo: true,
        error: null
      });
    } else {
      this.setState({
        ...this.state,
        mobileNo: x,
        validMobileNo: false,
        error: null
      });
    }
  };
  render() {
    const { err } = this.props.user;
    const { themes } = this.props;
    const disabled = !(
      this.state.validEmail &&
      this.state.validPassword &&
      this.state.validConfirmPassword &&
      this.state.validMobileNo
    );
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={140}
        extraScrollHeight={30}
        style={{ flex: 1, backgroundColor: "#EDEEF1" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: themes["light"].primary, flex: 1 }}>
          <View
            animation="zoomIn"
            iterationCount={1}
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <Animatable.Image
              style={{
                width: 60,
                height: 60,
                marginRight: 10
              }}
              source={require("./../assets/logo_transparent.png")}
              animation="zoomIn"
              iterationCount={1}
            />
            <Animatable.Text
              animation="zoomIn"
              iterationCount={1}
              style={{ fontSize: 32, fontFamily: "diavlo", color: "white" }}
            >
              Brunch
            </Animatable.Text>
          </View>
          <View
            style={{
              backgroundColor: "#EDEEF1",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              flex: 1
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
                  marginTop: 20,
                  marginBottom: 10
                }}
              >
                Create an account
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

              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  marginVertical: 5,
                  flexDirection: "row",
                  elevation: 1
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
              </View>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  marginVertical: 5,
                  flexDirection: "row",
                  elevation: 1
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
                  placeholder="Mobile Number"
                  value={this.state.mobileNo}
                  onChangeText={this._validMobileInput}
                />
              </View>

              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  marginVertical: 5,
                  flexDirection: "row",
                  elevation: 1
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
                  secureTextEntry={true}
                />
              </View>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  marginVertical: 5,
                  flexDirection: "row",
                  elevation: 1
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
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChangeText={this._validConfirmPasswordInput}
                  secureTextEntry={true}
                />
              </View>

              <View
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  marginTop: 30
                }}
              >
                <Button
                  style={{
                    backgroundColor: themes["light"].primary,
                    justifyContent: "center",
                    flex: 1,
                    opacity: disabled ? 0.75 : 1
                  }}
                  onPress={this._register}
                  disabled={disabled}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "800", color: "white" }}
                  >
                    Register
                  </Text>
                </Button>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  justifyContent: "center",
                  marginTop: 20
                }}
              >
                Already have a Account
              </Text>
              <Button
                bordered
                dark
                style={{
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: 6,
                  width: "100%",
                  marginBottom: 10
                }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#A1A1A5" }}
                >
                  Sign In
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
  register: register,
  textChange: textChange
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Register));
