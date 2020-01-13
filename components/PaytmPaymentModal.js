import React from "react";
import { Modal, WebView } from "react-native";
import _ from "lodash";
import { ipAddress } from "../constants";
class PaytmPaymentModal extends React.Component {
  _onloadingError = x => {
    console.log("_onloadingError");
    this.props.toggleModalVisiblity(false);
  };
  _handleTransaction = data => {
    const { loading, url, title } = data;
    console.log(data);
    if (
      loading === false &&
      _.startsWith(url, `${ipAddress}/api/txn/paytm/status`)
    ) {
      const jsonData = JSON.parse(title);
      console.log("jsonData", jsonData);
      this.props.toggleModalVisiblity(false);
    }
  };
  _onRequestClose = () => {
    this.props.toggleModalVisiblity(false);
  };
  render() {
    const { authToken, modalVisible } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={this._onRequestClose}
        onDismiss={() => {
          console.log("Modal has been onDismiss.");
        }}
        onShow={() => {
          console.log("Modal has been onShow.");
        }}
        presentationStyle={"fullScreen"}
      >
        <WebView
          source={{
            uri: `${ipAddress}/api/txn/paytm`,
            method: "post",
            body: `x-auth-token=${authToken}&ORDER_ID=${Date.now().toString()}&CUST_ID=p2@gmail.com&TXN_AMOUNT=1&CALLBACK_URL=${ipAddress}/api/txn/paytm/status`
          }}
          ref={webview => {
            this.webview = webview;
          }}
          onError={this._onloadingError}
          onNavigationStateChange={data => {
            this._handleTransaction(data);
          }}
          renderError={this._onloadingError}
        />
      </Modal>
    );
  }
}

export default PaytmPaymentModal;
