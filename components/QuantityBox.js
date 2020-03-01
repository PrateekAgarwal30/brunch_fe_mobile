import { Text, View, Alert } from "react-native";
import { Button } from "native-base";
import React from "react";
import * as Animatable from "react-native-animatable";
export default class QuantityBox extends React.Component {
  state = {
    quantity: 0
  };
  handleQty = x => {
    // console.log(x);
    if (x === "-" && this.state.quantity !== 0) {
      this.setState(prevState => ({
        ...prevState,
        quantity: prevState.quantity - 1
      }));
    } else if (x === "+") {
      if (this.state.quantity >= 5) {
        Alert.alert("Max 5 same meals can be ordered in a order.");
      } else {
        this.setState(prevState => ({
          ...prevState,
          quantity: prevState.quantity + 1
        }));
      }
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 7,
          flexDirection: "row",
          height: 30,
          borderColor: "#E19D40",
          borderWidth: 1.5,
          maxWidth: 70,
          borderRadius: 5,
          backgroundColor: "white"
        }}
      >
        <Button
          transparent
          style={{ flex: 2, height: 25, justifyContent: "center" }}
          onPress={() => this.handleQty("-")}
        >
          <Text
            style={{
              color: this.state.quantity === 0 ? "grey" : "#E19D40",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            -
          </Text>
        </Button>
        <Animatable.View
          animation={"fadeIn"}
          style={{
            flex: 3,
            height: 26.5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#E19D40"
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {this.state.quantity}
          </Text>
        </Animatable.View>
        <Button
          transparent
          style={{ flex: 2, height: 25, justifyContent: "center" }}
          onPress={() => this.handleQty("+")}
        >
          <Text
            style={{
              color: this.state.quantity === 5 ? "grey" : "#E19D40",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            +
          </Text>
        </Button>
      </View>
    );
  }
}
