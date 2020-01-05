import React from "react";
import { Modal, View, Text, ActivityIndicator } from "react-native";
const CustomActivityIndicator = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View
      style={{
        flex: 1,
        backgroundColor: "#dcdcdc",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5
      }}
    >
      <View
        style={{ borderRadius: 10, backgroundColor: "#16235A", padding: 25 }}
      >
        <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
          Loading
        </Text>
        <ActivityIndicator size="small" color="white" />
      </View>
    </View>
  </Modal>
);
export default CustomActivityIndicator;
