import { Text, View } from "react-native";
import { Button } from "native-base";
import React from "react";
export default props => {
  return (
    <View
      style={{
        flex: 7,
        flexDirection: "row",
        height: 30,
        borderColor: "#E19D40",
        borderWidth: 1.5,
        maxWidth: 60,
        borderRadius: 5
      }}
    >
      <Button
        transparent
        style={{ flex: 2, height: 23, justifyContent: "center" }}
      >
        <Text style={{ color: "#E19D40", fontSize: 24, fontWeight: "bold" }}>
          -
        </Text>
      </Button>
      <Button
        transparent
        style={{ flex: 3, height: 25, justifyContent: "center" }}
      >
        <Text style={{ color: "#E19D40", fontSize: 16, fontWeight: "bold" }}>
          0
        </Text>
      </Button>
      <Button
        transparent
        style={{ flex: 2, height: 23, justifyContent: "center" }}
      >
        <Text style={{ color: "#E19D40", fontSize: 18, fontWeight: "bold" }}>
          +
        </Text>
      </Button>
    </View>
  );
};
