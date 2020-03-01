import { Text, View, Alert, AsyncStorage } from "react-native";
import { Button } from "native-base";
import React from "react";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
export default class QuantityBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      mealId: props.mealId
    };
  }
  async componentDidMount() {
    const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
    const cart = JSON.parse(cartAsync);
    let cartItem = _.find(cart, _.matchesProperty("mealId", this.state.mealId));
    if (cartItem) {
      this.setState({ ...this.state, quantity: cartItem.quantity });
    }
  }
  handleQty = async x => {
    if (x === "-" && this.state.quantity !== 0) {
      const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
      let cart = JSON.parse(cartAsync);
      let cartItem = _.find(
        cart,
        _.matchesProperty("mealId", this.state.mealId)
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
      // console.log(cart);
      AsyncStorage.setItem("cart", JSON.stringify(cart));
      this.setState(prevState => ({
        ...prevState,
        quantity: prevState.quantity - 1
      }));
    } else if (x === "+") {
      if (this.state.quantity >= 5) {
        Alert.alert("Max 5 same meals can be ordered in a order.");
      } else {
        const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
        const cart = JSON.parse(cartAsync);
        let cartItem = _.find(
          cart,
          _.matchesProperty("mealId", this.state.mealId)
        );
        if (cartItem) {
          const cartItemIndex = _.findIndex(cart, cartItem);
          cartItem.quantity += 1;
          cart[cartItemIndex] = cartItem;
        } else {
          cartItem = {
            mealId: this.state.mealId,
            quantity: 1
          };
          cart.push(cartItem);
        }
        // console.log(cart);
        AsyncStorage.setItem("cart", JSON.stringify(cart));
        this.setState({ ...this.state, quantity: cartItem.quantity });
      }
    }
  };
  render() {
    if (this.state.quantity === 0) {
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
            onPress={() => this.handleQty("+")}
          >
            <Text
              style={{
                color: this.state.quantity === 5 ? "grey" : "#E19D40",
                fontSize: 16,
                fontWeight: "bold"
              }}
            >
              Buy
            </Text>
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
            animation={"bounceIn"}
            duration={500}
            style={{
              flex: 3,
              height: 26.5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E19D40"
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "200" }}>
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
}
