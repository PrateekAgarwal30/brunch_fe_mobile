import React from "react";
import { Text, View, AsyncStorage, FlatList } from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Body, Button, Icon, Left, Right } from "native-base";
import { withAppContextConsumer } from "../components/AppContext";
import { postCartItems, clearCartItems } from "../redux/actions";
import {
  CartListItem,
  NoCartListItem,
  CartAmountDetails
} from "../components/CartListItems";
import appEventEmitter from "../utils/eventUtil";
import _ from "lodash";
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealsWithQuantityFromCart: []
    };
    this.onCartUpdate = this.onCartUpdate;
  }

  onCartUpdate = async () => {
    const cart = (await AsyncStorage.getItem("cart")) || "[]";
    const cartItems = JSON.parse(cart);
    await this.props.postCartItems(cartItems);
  };

  async componentDidMount() {
    try {
      const cart = (await AsyncStorage.getItem("cart")) || "[]";
      const cartItems = JSON.parse(cart);
      await this.props.postCartItems(cartItems);
      appEventEmitter.on("cartUpdated", this.onCartUpdate);
    } catch (error) {
      console.log(error.message);
    }
  }

  componentWillUnmount() {
    this.props.clearCartItems();
    appEventEmitter.removeEventListener("cartUpdated", this.onCartUpdate);
  }

  render() {
    const { themes } = this.props;
    const { cart, isCartLoading } = this.props.user;
    const cartData = _.get(cart, "cartItems", []) || [];
    const priceDetails = _.get(cart, "priceDetails", {}) || {};
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "#EDEEF1"
        }}
      >
        <LinearGradient
          colors={[themes["light"].secondary, themes["light"].primary]}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2,
            marginBottom: 5
          }}
        >
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "white", fontSize: 25 }}
                />
              </Button>
            </Left>
            <Body>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Cart
              </Text>
            </Body>
            <Right />
          </Header>
        </LinearGradient>
        <FlatList
          data={cartData}
          renderItem={({ item }) => <CartListItem mealData={item} />}
          keyExtractor={itemData => itemData._id}
          onRefresh={() => {
            this.props.postCartItems();
          }}
          refreshing={isCartLoading || false}
          ListEmptyComponent={<NoCartListItem />}
          ListFooterComponent={
            <CartAmountDetails priceDetails={priceDetails} />
          }
        />
        {cartData.length ? (
          <Button
            style={{
              textAlign: "center",
              justifyContent: "center",
              margin: 10,
              backgroundColor: themes["light"].primary
            }}
            onPress={this._onChangeAddress}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Proceed to Payment
            </Text>
          </Button>
        ) : null}
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
