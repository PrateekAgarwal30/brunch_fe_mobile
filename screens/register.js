import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
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
import { register } from "../redux/actions";
class Register extends React.Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
    validEmail: null,
    validPassword: null,
    validConfirmPassword: null
  };
  componentDidUpdate() {
    console.log("componentDidUpdate");
    if (this.props.user.jwtToken) {
      this.props.navigation.navigate('Home');
    }
  }
  componentWillReceiveProps(){
    console.log("componentWillReceiveProps");
    if (this.props.user.jwtToken) {
      this.props.navigation.navigate('Home');
    }
  }
  com
  _register = x => {
    this.props.register(this.state.email, this.state.password);
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
  __validConfirmPasswordInput = x => {
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
          {JSON.stringify(this.state)}
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
                value={this.state.email}
                onChangeText={this._validEmailInput}
              />
            </FormItem>
            <FormItem floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={this._validPasswordInput}
              />
            </FormItem>
            <FormItem floatingLabel last>
              <Label>Confirm Password</Label>
              <Input
                secureTextEntry={true}
                value={this.state.confirmPassword}
                onChangeText={this.__validConfirmPasswordInput}
              />
            </FormItem>
            <Button
              full
              primary
              style={{ paddingBottom: 4 }}
              onPress={this._register}
              disabled={
                !(
                  this.state.validEmail &&
                  this.state.validPassword &&
                  this.state.validConfirmPassword
                )
              }
            >
              <Text> Register </Text>
            </Button>
          </Form>
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
  register: register
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);
