import React, { Component } from "react";
import { WebView, Modal } from "react-native";
import { ipAddress } from "./../constants";
export default class Colors extends Component {
  render() {
    return (
      <Modal onRequestClose={this.props.toogleColorViewOpen}>
        <WebView
          source={{
            uri: `${ipAddress}/api/general/colors`
          }}
        />
      </Modal>
    );
  }
}
