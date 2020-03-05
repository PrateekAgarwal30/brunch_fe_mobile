import React from "react";
import { View, AsyncStorage, FlatList } from "react-native";
import { connect } from "react-redux";
import { withAppContextConsumer } from "../components/AppContext";
import { postCartItems, clearCartItems } from "../redux/actions";
import { MealsListItem, NoMealsListItem } from "../components/MealListItems";
import appEventEmitter from "../utils/eventUtil";
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
    const { cart, isCartLoading } = this.props.user;
    // console.log(cart);
    return (
      <View>
        <FlatList
          data={cart ? cart.cartItems || [] : []}
          renderItem={({ item }) => <MealsListItem mealData={item} />}
          keyExtractor={itemData => itemData._id}
          onRefresh={() => {
            this.props.postCartItems();
          }}
          refreshing={isCartLoading || false}
          // ListHeaderComponent={<BannerCarousel />}
          numColumns={2}
          ListEmptyComponent={<NoMealsListItem />}
        />
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
