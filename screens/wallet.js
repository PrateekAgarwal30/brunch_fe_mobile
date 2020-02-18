import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { AsyncStorage, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Right,
  Label
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import PaytmPaymentModal from "../components/PaytmPaymentModal";
import PaypalPaymentModal from "../components/PaypalPaymentModal";
import RazorpayPaymentModal from "../components/RazorpayPaymentModal";
import { getProfile } from "../redux/actions";

class Wallet extends React.Component {
  state = {
    paytmModalVisible: false,
    paypalModalVisible: false,
    razorpayModalVisible: false,
    activeTab: 1,
    addMoneyValue: "100"
  };
  async componentDidMount() {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      this.setState(prevState => ({
        ...prevState,
        authToken: authToken
      }));
    } catch (error) {
      console.log(error.message);
    }
  }
  togglePaytmModalVisible = visible => {
    if (visible && +this.state.addMoneyValue < 10) {
      Alert.alert("Mininum Transaction Amount is 10Rs");
      this.addMoneyInput.focus();
    } else {
      this.setState(prevState => ({
        ...prevState,
        paytmModalVisible: visible
      }));
    }
  };
  togglePaypalModalVisible = visible => {
    this.setState(prevState => ({
      ...prevState,
      paypalModalVisible: visible
    }));
  };
  toggleRazorpayModalVisible = visible => {
    this.setState(prevState => ({
      ...prevState,
      razorpayModalVisible: visible
    }));
  };

  onAddMoneyChange = x => {
    if (!isNaN(+x) && !_.includes(x, ".")) {
      if (+x > 10000) {
        Alert.alert("Max Transaction Amount is 10000Rs");
      } else {
        this.setState(prevState => ({
          ...prevState,
          addMoneyValue: +x + ""
        }));
      }
    }
  };
  onAddMoneyButtonClick = x => {
    if (+this.state.addMoneyValue + x > 10000) {
      Alert.alert("Max Transaction Amount is 10000Rs");
    } else {
      this.setState(prevState => ({
        ...prevState,
        addMoneyValue: +prevState.addMoneyValue + x + ""
      }));
    }
  };
  render() {
    const isLoading = this.props.user.isLoading;
    const authToken = this.state.authToken;
    const walletBalance = _.get(this.props.profile,'wallet.walletBalance',0.00) || 0.00;
    if (isLoading || !authToken) {
      return <CustomActivityIndicator />;
    }
    return (
      <Container
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "white"
          // marginTop: Contants.statusBarHeight
        }}
      >
        <LinearGradient
          colors={["#1721AC", "#16235A"]}
          style={{
            minHeight: 250,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2
          }}
        >
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "#E1E0E2", fontSize: 25 }}
                />
              </Button>
            </Left>
            <Right />
          </Header>
          <View padder style={{ display: "flex", flex: 1 }}>
            <View>
              <Label
                style={{
                  fontFamily: "diavlo",
                  fontSize: 18,
                  color: "#E1E0E2",
                  marginLeft: 20,
                  marginBottom: 10,
                  includeFontPadding: true,
                  textDecorationLine: "underline"
                }}
              >
                Brunch Cash
              </Label>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Label
                style={{
                  fontFamily: "diavlo",
                  fontSize: 32,
                  color: "#E1E0E2",
                  marginLeft: 20
                }}
              >
                {walletBalance}
              </Label>
              <Label
                style={{
                  fontFamily: "diavlo",
                  fontSize: 16,
                  color: "#E1E0E2",
                  marginLeft: 5,
                  marginTop: 2
                }}
              >
                INR
              </Label>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                marginBottom: 2
              }}
            >
              <Button
                transparent
                style={
                  this.state.activeTab === 1
                    ? {
                        borderBottomColor: "#E1E0E2",
                        borderBottomWidth: 2,
                        padding: 5
                      }
                    : {
                        borderBottomColor: "#E1E0E2",
                        borderBottomWidth: 0,
                        padding: 5
                      }
                }
                onPress={() =>
                  this.setState(prevState => ({
                    ...prevState,
                    activeTab: 1
                  }))
                }
              >
                <Icon
                  name="ios-flash"
                  style={{ color: "#E1E0E2", marginRight: 4, marginLeft: 4 }}
                ></Icon>
                <Text style={{ color: "#E1E0E2", fontSize: 14 }}>
                  {"Recharge Wallet"}
                </Text>
              </Button>

              <Button
                transparent
                style={
                  this.state.activeTab === 2
                    ? {
                        borderBottomColor: "#E1E0E2",
                        borderBottomWidth: 2,
                        padding: 5
                      }
                    : {
                        borderBottomColor: "#E1E0E2",
                        borderBottomWidth: 0,
                        padding: 5
                      }
                }
                onPress={() =>
                  this.setState(prevState => ({
                    ...prevState,
                    activeTab: 2
                  }))
                }
              >
                <MaterialIcons
                  name="history"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 24,
                    marginRight: 4,
                    marginLeft: 4
                  }}
                />
                <Text style={{ color: "#E1E0E2", fontSize: 14 }}>
                  {"Transaction History"}
                </Text>
              </Button>
            </View>
          </View>
        </LinearGradient>
        <PaytmPaymentModal
          authToken={authToken}
          modalVisible={this.state.paytmModalVisible}
          toggleModalVisiblity={this.togglePaytmModalVisible}
          txnAmount={this.state.addMoneyValue}
          getProfile={this.props.getProfile}
        />
        <PaypalPaymentModal
          authToken={authToken}
          modalVisible={this.state.paypalModalVisible}
          toggleModalVisiblity={this.togglePaypalModalVisible}
          txnAmount={this.state.addMoneyValue}
          getProfile={this.props.getProfile}
        />
        <RazorpayPaymentModal
          authToken={authToken}
          modalVisible={this.state.razorpayModalVisible}
          toggleModalVisiblity={this.toggleRazorpayModalVisible}
          txnAmount={this.state.addMoneyValue}
          getProfile={this.props.getProfile}
        />
        {this.state.activeTab === 1 ? (
          <View style={{ flex: 1 }}>
            <View style={{ padding: 10 }}>
              <Label style={{ fontWeight: "bold" }}>
                Recharge Brunch Wallet
              </Label>
              <TextInput
                style={styles.textWrapper}
                placeholder="Add Money"
                value={this.state.addMoneyValue}
                onChangeText={this.onAddMoneyChange}
                keyboardAppearance={"dark"}
                keyboardType={"numeric"}
                ref={addMoneyInput => (this.addMoneyInput = addMoneyInput)}
              />
            </View>
            <View
              style={{
                display: "flex",
                flex: 4,
                flexDirection: "row",
                justifyContent: "space-around",
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              <Button
                style={styles.addMoneyButtons}
                onPress={() => this.onAddMoneyButtonClick(100)}
              >
                <Text style={styles.addMoneyText}>+100</Text>
              </Button>
              <Button
                style={styles.addMoneyButtons}
                onPress={() => this.onAddMoneyButtonClick(200)}
              >
                <Text style={styles.addMoneyText}>+200</Text>
              </Button>
              <Button
                style={styles.addMoneyButtons}
                onPress={() => this.onAddMoneyButtonClick(500)}
              >
                <Text style={styles.addMoneyText}>+500</Text>
              </Button>
              <Button
                style={styles.addMoneyButtons}
                onPress={() => this.onAddMoneyButtonClick(1000)}
              >
                <Text style={styles.addMoneyText}>+1000</Text>
              </Button>
            </View>
            <View style={{ padding: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}
              >
                Payment Gateways
              </Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Button
                  style={{
                    textAlign: "center ",
                    justifyContent: "center",
                    margin: 10,
                    elevation: 3,
                    backgroundColor: "#E1E0E2",
                    borderBottomWidth: 5,
                    flex: 1
                  }}
                  onPress={() => this.togglePaytmModalVisible(true)}
                >
                  <Image
                    style={{ width: 50, height: 20 }}
                    source={require("./../assets/paytm.png")}
                  />
                  {/* <Text
                    style={{
                      color: "#1721AC",
                      fontSize: 16,
                      fontWeight: "bold"
                    }}
                  >
                    {"Pay With PayTm"}
                  </Text> */}
                </Button>
                <Button
                  style={{
                    textAlign: "center ",
                    justifyContent: "center",
                    margin: 10,
                    elevation: 3,
                    backgroundColor: "#E1E0E2",
                    borderBottomWidth: 5,
                    flex: 1
                  }}
                  onPress={() => this.toggleRazorpayModalVisible(true)}
                >
                  <Image
                    style={{ width: 50, height: 20 }}
                    source={require("./../assets/razorpay.png")}
                  />

                  {/* <Text style={{ color: "#E1E0E2", fontSize: 16 }}>
                    {"Pay With Razorpay"}
                  </Text> */}
                </Button>
                <Button
                  style={{
                    textAlign: "center ",
                    justifyContent: "center",
                    margin: 10,
                    elevation: 3,
                    backgroundColor: "#E1E0E2",
                    borderBottomWidth: 5,
                    flex: 1
                  }}
                  onPress={() => this.togglePaypalModalVisible(true)}
                >
                  <Image
                    style={{ width: 50, height: 19 }}
                    source={require("./../assets/paypal.png")}
                  />

                  {/* <Text style={{ color: "#E1E0E2", fontSize: 16 }}>
                    {"Pay With PayPal"}
                  </Text> */}
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </Container>
    );
  }
}

Wallet.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  addMoneyButtons: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    elevation: 2
  },
  addMoneyText: {
    fontSize: 14,
    color: "#E1E0E2",
    fontWeight: "bold"
  },
  textWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    display: "flex",
    fontSize: 30,
    zIndex: 10,
    width: "100%",
    borderBottomWidth: 5,
    borderBottomColor: "#C0BEC4"
  }
});
const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {
  getProfile : getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(Wallet);
