import React from "react";

import { View, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
export const CurrentLocationButton = function(props) {
  const bottom = props.bottom ? props.bottom : 125;
  const cb = props.cb
    ? props.cb
    : () => {
        console.log("cb function not paased to CurrentLocationButton");
      };
  return (
    <View style={[styles.container, { top: height - bottom }]}>
      <MaterialIcons
        name="my-location"
        color="#000000"
        size={25}
        onPress={() => {
          cb();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: 45,
    height: 45,
    backgroundColor: "white",
    right: 5,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
