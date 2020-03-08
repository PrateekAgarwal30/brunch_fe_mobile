import { Text, View, Alert, AsyncStorage } from "react-native";
import { Button } from "native-base";
import React from "react";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import appEventEmitter from "../utils/eventUtil";
import { withAppContextConsumer } from "./AppContext";
class QuantityBox extends React.Component {
  handleQty = async x => {
    if (x === "-" && this.props.quantity !== 0) {
      const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
      let cart = JSON.parse(cartAsync);
      let cartItem = _.find(
        cart,
        _.matchesProperty("mealId", this.props.mealId)
      );
      if (cartItem) {
        const cartItemIndex = _.findIndex(cart, cartItem);
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          cart[cartItemIndex] = cartItem;
        } else {
          cart = _.filter(cart, item => item.mealId !== cartItem.mealId);
        }
      }
      AsyncStorage.setItem("cart", JSON.stringify(cart)).then(() => {
        appEventEmitter.emit("cartUpdated");
      });
    } else if (x === "+") {
      if (this.props.quantity >= 5) {
        Alert.alert("Max 5 same meals can be ordered in a order.");
      } else {
        const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
        const cart = JSON.parse(cartAsync);
        let cartItem = _.find(
          cart,
          _.matchesProperty("mealId", this.props.mealId)
        );
        if (cartItem) {
          const cartItemIndex = _.findIndex(cart, cartItem);
          cartItem.quantity += 1;
          cart[cartItemIndex] = cartItem;
        } else {
          cartItem = {
            mealId: this.props.mealId,
            quantity: 1
          };
          cart.push(cartItem);
        }
        AsyncStorage.setItem("cart", JSON.stringify(cart)).then(() => {
          appEventEmitter.emit("cartUpdated");
        });
      }
    }
  };
  render() {
    const { themes } = this.props;
    if (this.props.quantity === 0) {
      return (
        <View
          style={{
            flex: 7,
            flexDirection: "row",
            height: 30,
            borderColor: themes["light"].primary,
            borderWidth: 1.5,
            maxWidth: 70,
            borderRadius: 5,
            backgroundColor: "white"
          }}
        >
          <Button
            transparent
            style={{ flex: 2, height: 25, justifyContent: "center" }}
            onPress={() => this.handleQty("+")}
          >
            <Animatable.Text
              animation="bounceIn"
              style={{
                color:
                  this.props.quantity === 5 ? "grey" : themes["light"].primary,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Buy
            </Animatable.Text>
          </Button>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 7,
            flexDirection: "row",
            height: 30,
            borderColor: themes["light"].primary,
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
                color:
                  this.props.quantity === 0 ? "grey" : themes["light"].primary,
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              -
            </Text>
          </Button>
          <Animatable.View
            animation={"bounceIn"}
            duration={500}
            style={{
              flex: 3,
              height: 26.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: themes["light"].primary
            }}
          >
            <Animatable.Text
              animation="fadeIn"
              style={{ color: "white", fontSize: 16, fontWeight: "200" }}
            >
              {this.props.quantity}
            </Animatable.Text>
          </Animatable.View>
          <Button
            transparent
            style={{ flex: 2, height: 25, justifyContent: "center" }}
            onPress={() => this.handleQty("+")}
          >
            <Text
              style={{
                color:
                  this.props.quantity === 5 ? "grey" : themes["light"].primary,
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
}

export default withAppContextConsumer(QuantityBox);
