import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { Button, Content } from "native-base";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { AsyncStorage } from "react-native";
import PaytmPaymentModal from "../components/PaytmPaymentModal";
import PaypalPaymentModal from "../components/PaypalPaymentModal";
class Payments extends React.Component {
  state = {
    paytmModalVisible: false,
    paypalModalVisible: false
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
    this.setState(prevState => ({
      ...prevState,
      paytmModalVisible: visible
    }));
  };
  togglePaypalModalVisible = visible => {
    this.setState(prevState => ({
      ...prevState,
      paypalModalVisible: visible
    }));
  };
  render() {
    const isLoading = this.props.user.isLoading;
    const authToken = this.state.authToken;
    if (isLoading || !authToken) {
      return <CustomActivityIndicator />;
    }
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0
        }}
      >
        <PaytmPaymentModal
          authToken={authToken}
          modalVisible={this.state.paytmModalVisible}
          toggleModalVisiblity={this.togglePaytmModalVisible}
        />
        <PaypalPaymentModal
          authToken={authToken}
          modalVisible={this.state.paypalModalVisible}
          toggleModalVisiblity={this.togglePaypalModalVisible}
        />
        <Content
          padder
          style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }}
        >
          <Button
            style={{
              textAlign: "center ",
              justifyContent: "center",
              marginBottom: 10
            }}
            onPress={() => this.togglePaytmModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {"Pay With PayTm"}
            </Text>
          </Button>
          <Button
            style={{
              textAlign: "center ",
              justifyContent: "center"
            }}
            onPress={() => this.togglePaypalModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {"Pay With PayPal"}
            </Text>
          </Button>
        </Content>
      </View>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(Payments);
