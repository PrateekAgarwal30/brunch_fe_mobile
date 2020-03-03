import React from "react";
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { withAppContextConsumer } from "../components/AppContext";
import { postCartItems, clearCartItems } from "../redux/actions";
class Cart extends React.Component {
  state = {
    cartItems: []
  };
  async componentDidMount() {
    try {
      const cart = (await AsyncStorage.getItem("cart")) || "[]";
      const cartItems = JSON.parse(cart);
      await this.props.postCartItems(cartItems);
    } catch (error) {
      console.log(error.message);
    }
  }
  componentWillUnmount() {
    this.props.clearCartItems();
  }
  render() {
    const { cart } = this.props.user;
    // console.log(cart);
    return (
      <View>
        <Text>{JSON.stringify(cart)}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({ profile: state.profile, user: state.user });
const mapActionsToProps = {
  postCartItems: postCartItems,
  clearCartItems: clearCartItems
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Cart));
