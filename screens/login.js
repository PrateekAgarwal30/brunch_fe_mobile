import React from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Button,
  TouchableHighlight,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/actions";
import { ipAddress } from "../constants";
import { Constants } from "expo";
const { width, height } = Dimensions.get("screen");
class Login extends React.Component {
  state = {
    validEmail: true,
    validPassword: true,
    email: "P@gmail.com",
    password: "11234",
    error: null
  };
  componentDidMount() { }
  _checkLogin = () => {
    this.props
      .login(this.state.email, this.state.password)
      .then(() => {
        if (this.props.user.jwtToken) this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  _validEmailInput = x => {
    reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(x);
    this.setState({
      ...this.state,
      email: x,
      validEmail: reg.test(x) != 0,
      error: null
    });
    // console.log(reg.test(x) != 0);
  };
  _validPasswordInput = x => {
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
          <Image
            style={styles.logo}
            source={require("./../assets/logo.png")}
          />
          <Text style={styles.welcomeText}>Welcome to Brunch App</Text>
          <Text>{this.props.user.err}</Text>
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
          <TouchableHighlight
            style={styles.loginWrapper}
            onPress={this._checkLogin}
          // disabled={!(this.state.validEmail && this.state.validPassword)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <View style={styles.registerWrapper}>
            <Text style={{ fontSize: 16, marginRight: 50,color:'white'}}>
              Don't have Account ?
            </Text>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={{ fontSize: 16, color: 'white', textDecorationLine : 'underline' }}>Register</Text>
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
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    width: "100%",
    color: "white"
  },
  registerWrapper: {
    flexDirection: 'row',
    padding: 15
  }
});
const mapStateToProps = state => ({
  user: state.user
});
const mapActionsToProps = {
  login: login
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
