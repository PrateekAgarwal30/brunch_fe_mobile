import React from "react";
import { StyleSheet, View, Text, TextInput, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { Header, Body, Button, Content, Icon, Left, Right } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { register, textChange, changePassword } from "../redux/actions";
import CustomActivityIndicator from "./../components/CustomActivityIndicator";
import { withAppContextConsumer } from "../components/AppContext";
class ChangePassword extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    newP: null,
    oldP: null,
    confirmP: null,
    validNewP: null,
    validOldP: null,
    validConfirmP: null
  };

  _changePassword = async x => {
    try {
      const result = await this.props.changePassword(
        this.state.oldP,
        this.state.confirmP,
        this.state.newP
      );
      this.setState({
        newP: null,
        oldP: null,
        confirmP: null,
        validNewP: null,
        validOldP: null,
        validConfirmP: null
      });
      ToastAndroid.show(result, ToastAndroid.SHORT);
      this.props.navigation.navigate("Home");
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
    const isLoading = this.props.user.isLoading;
    const { themes } = this.props;
    if (isLoading) {
      return <CustomActivityIndicator />;
    }
    const disabled = !(
      this.state.validOldP &&
      this.state.validNewP &&
      this.state.validConfirmP
    );
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "#EDEEF1"
        }}
      >
        <LinearGradient
          colors={[themes["light"].secondary, themes["light"].primary]}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2
          }}
        >
          <Header transparent>
            <Left style={{ flex: 2 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "white", fontSize: 25 }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 7 }}>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Change Password
              </Text>
            </Body>
            <Right style={{ flex: 2 }} />
          </Header>
        </LinearGradient>
        <Content padder contentContainerStyle={styles.wrapper}>
          <Text style={{ color: "red", marginTop: 30 }}>
            {this.props.user.err}
          </Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInputWrapper}
              placeholder="Old Password"
              value={this.state.oldP}
              onChangeText={this._validOldPasswordInput}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInputWrapper}
              placeholder="New Password"
              value={this.state.newP}
              onChangeText={this._validNewPasswordInput}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInputWrapper}
              placeholder="Confirm New Password"
              value={this.state.confirmP}
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
              onPress={this._changePassword}
              disabled={disabled}
            >
              <Text style={{ fontSize: 20, fontWeight: "800", color: "white" }}>
                Confirm
              </Text>
            </Button>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: "#EDEEF1",
    paddingHorizontal: 15
  },
  textInputView: {
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 10
  },
  textInputWrapper: {
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
  textChange: textChange,
  changePassword: changePassword
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(ChangePassword));
