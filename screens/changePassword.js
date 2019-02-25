import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Button,
  TouchableHighlight,
  TextInput,
  ToastAndroid
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Constants } from "expo";
import { register, textChange, changePassword } from "../redux/actions";
class ChangePassword extends React.Component {
  state = {
    newP: null,
    oldP: null,
    confirmP: null,
    validNewP: null,
    validOldP: null,
    validConfirmP: null
  };

  _changePassword = async (x) => {
    try {
      const a = await this.props.changePassword(this.state.oldP, this.state.confirmP, this.state.newP)
      this.setState({
        newP: null,
        oldP: null,
        confirmP: null,
        validNewP: null,
        validOldP: null,
        validConfirmP: null
      });
      ToastAndroid.show(a, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  _validOldPasswordInput = x => {
    if (this.props.user.err) this.props.textChange();
    if (x.length >= 5) {
      this.setState({
        ...this.state,
        oldP: x,
        validOldP: true
      });
    } else {
      this.setState({
        ...this.state,
        oldP: x,
        validOldP: false
      });
    }
  };
  _validNewPasswordInput = x => {
    if (this.props.user.err) this.props.textChange();
    if (x.length >= 5 && x === this.state.confirmP) {
      this.setState({
        ...this.state,
        newP: x,
        validNewP: true,
        validConfirmP: true
      });
    } else {
      this.setState({
        ...this.state,
        newP: x,
        validNewP: false,
        validConfirmP: false
      });
    }
  };
  _validConfirmPasswordInput = x => {
    if (this.props.user.err) this.props.textChange();
    if (x.length >= 5 && x === this.state.newP) {
      this.setState({
        ...this.state,
        confirmP: x,
        validNewP: true,
        validConfirmP: true
      });
    } else {
      this.setState({
        ...this.state,
        confirmP: x,
        validNewP: false,
        validConfirmP: false
      });
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        {/* <View style={styles.logoWrapper}> */}
        <Text style={{ color: "red", marginTop: 30 }}>{this.props.user.err}</Text>
        <TextInput
          style={styles.textWrapper}
          placeholder="Old Password"
          value={this.state.oldP}
          onChangeText={this._validOldPasswordInput}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textWrapper}
          placeholder="New Password"
          value={this.state.newP}
          onChangeText={this._validNewPasswordInput}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.textWrapper}
          placeholder="New Password"
          value={this.state.confirmP}
          onChangeText={this._validConfirmPasswordInput}
          secureTextEntry={true}
        />
        <TouchableHighlight
          style={styles.loginWrapper}
          onPress={this._changePassword}
          disabled={
            !(
              this.state.validOldP &&
              this.state.validNewP &&
              this.state.validConfirmP
            )
          }
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: "#A4A4BF",
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 40
  },
  logoWrapper: {},
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
  textChange: textChange,
  changePassword: changePassword
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(ChangePassword);
