import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/actions";
import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Card
} from "native-base";
import { ipAddress } from "../constants";
import { Constants } from "expo";
class Login extends React.Component {
  state = {
    validEmail: null,
    validPassword: null,
    email: null,
    password: null,
    error: null
  };
  componentDidMount() {
    // fetch(ipAddress)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(ex => console.log(ex.message));
  }
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
      <Container style={styles.container}>
        <Text style={{ textAlign: "center", alignItems: "center" }}>
          {this.props.user.err}
        </Text>
        <Card style={styles.card}>
          <Text
            style={{ textAlign: "center", alignItems: "center", color: "red" }}
          >
            {JSON.stringify(this.props.user)}
          </Text>
          <Form>
            <FormItem floatingLabel>
              <Label>Email</Label>
              <Input
                style={{ color: this.state.validEmail ? "blue" : "red" }}
                onChangeText={this._validEmailInput}
                value={this.state.email}
              />
            </FormItem>
            <FormItem floatingLabel last>
              <Label>Password</Label>
              <Input
                style={{ color: this.state.validPassword ? "blue" : "red" }}
                secureTextEntry={true}
                onChangeText={this._validPasswordInput}
                value={this.state.password}
              />
            </FormItem>
            <Button
              full
              primary
              style={{ paddingBottom: 4 }}
              onPress={this._checkLogin}
              disabled={!(this.state.validEmail && this.state.validPassword)}
            >
              <Text> Login </Text>
            </Button>
          </Form>
          <Container style={styles.registerContainer}>
            <Text>Don't have Account ?</Text>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text>Register</Text>
            </Button>
          </Container>
        </Card>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  card: {
    flex: 1,
    // backgroundColor: "#0ABDA0",
    justifyContent: "center",
    color: "#fff"
  },
  registerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
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
