import React from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  WebView
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { Button, Content } from "native-base";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { ipAddress } from "../constants";

class Payments extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  _onloadingError = () => {
    Alert.alert("Loading Error");
    this.setModalVisible(false);
  };
  _handleTransaction = data => {
    const { loading, url, title } = data;
    if (loading === false && url === `${ipAddress}/api/txnPaytm/status`) {
      const jsonData = JSON.parse(title);
      console.log("jsonData", jsonData);
      this.setModalVisible(false);
    }
  };
  render() {
    const isLoading = this.props.user.isLoading;
    if (isLoading) {
      return <CustomActivityIndicator />;
    }
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
          //   hardwareAccelerated={true}
          onDismiss={() => {
            console.log("Modal has been onDismiss.");
          }}
          onShow={() => {
            console.log("Modal has been onShow.");
          }}
          presentationStyle={"fullScreen"}
        >
          {/* <View style={{ marginTop: 22 }}>
            <View> */}
          <WebView
            source={{
              uri: `${ipAddress}/api/txnPaytm`,
              method: "post",
              headers: {
                "Content-Type": "application/json"
              },
              body: `ORDER_ID=${Date.now().toString()}&CUST_ID=p2@gmail.com&TXN_AMOUNT=1&CALLBACK_URL=${ipAddress}/api/txnPaytm/status`
            }}
            ref={webview => {
              this.webview = webview;
            }}
            onError={this._onloadingError}
            onNavigationStateChange={data => {
              this._handleTransaction(data);
            }}
          />
        </Modal>

        <Content
          padder
          style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }}
        >
          <Button
            style={{
              textAlign: "center ",
              justifyContent: "center"
            }}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {"Pay With Paytm"}
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
