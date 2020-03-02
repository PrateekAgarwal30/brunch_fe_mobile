import React from "react";
import { Text, TextInput, View, FlatList } from "react-native";
import { Header, Button, Icon, Left, Right, Body, Card } from "native-base";
import { connect } from "react-redux";
import { getProfile, getMeals } from "../redux/actions";
// import { Notifications } from "expo";
import { withAppContextConsumer } from "./../components/AppContext";
import Colors from "./../components/Colors";
import BannerCarousel from "./../components/BannerCarousel";
// import Constants from "expo-constants";
import { MealsListItem, NoMealsListItem } from "../components/MealListItems";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
class Home extends React.Component {
  state = {
    colorViewOpen: false,
    searchText: "",
    searcToolVisiable: false
  };

  toogleColorViewOpen = () => {
    this.setState(prevSate => ({
      colorViewOpen: !prevSate.colorViewOpen
    }));
  };

  async componentDidMount() {
    try {
      this.props.getProfile();
      this.props.getMeals();
    } catch (err) {
      console.log(err.message);
    }
    // Notifications.addListener(payload => console.log(JSON.stringify(payload)));
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  _SearchTextHandler = text => {
    this.setState(prevState => ({
      ...prevState,
      searchText: text
    }));
  };
  render() {
    const { isLoading, meals } = this.props.user;
    const { themes } = this.props;
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
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="menu"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
            </Left>
            <Body
              style={{
                flex: 6
              }}
            ></Body>
            <Right style={{ flex: 2 }}>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="heart"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    searcToolVisiable: !this.state.searcToolVisiable
                  })
                }
              >
                <Icon
                  name="search"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="cart"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
            </Right>
          </Header>
          {this.state.searcToolVisiable ? (
            <Animatable.View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "#E1E0E2",
                marginBottom: 5,
                borderRadius: 10
              }}
              animation={"zoomIn"}
              duration={200}
            >
              <TextInput
                style={{
                  padding: 8,
                  display: "flex",
                  fontSize: 15,
                  width: "88%"
                }}
                maxLength={25}
                placeholder="Search Meal Box..."
                value={this.state.searchText}
                onChangeText={this._SearchTextHandler}
              />
              {this.state.searchText ? (
                <Icon
                  name="md-close"
                  size={20}
                  color="#000"
                  style={{
                    alignSelf: "center",
                    marginRight: 15
                  }}
                  onPress={() => {
                    this._SearchTextHandler("");
                  }}
                />
              ) : (
                <Icon
                  name="ios-search"
                  size={20}
                  color="#000"
                  style={{
                    alignSelf: "center",
                    marginRight: 10
                  }}
                />
              )}
            </Animatable.View>
          ) : null}
        </LinearGradient>

        <FlatList
          data={meals}
          renderItem={({ item }) => <MealsListItem mealData={item} />}
          keyExtractor={itemData => itemData._id}
          onRefresh={() => {
            this.props.getMeals();
          }}
          refreshing={isLoading}
          ListHeaderComponent={<BannerCarousel />}
          numColumns={2}
          ListEmptyComponent={<NoMealsListItem />}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10
          }}
        >
          <Button
            style={{ flex: 1, justifyContent: "center", marginHorizontal: 2 }}
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Profile</Text>
          </Button>
          <Button
            style={{ flex: 1, justifyContent: "center", marginHorizontal: 2 }}
            onPress={() => this.props.navigation.navigate("Wallet")}
          >
            <Text>Wallet</Text>
          </Button>
          <Button
            style={{ flex: 1, justifyContent: "center", marginHorizontal: 2 }}
            onPress={this.toogleColorViewOpen}
          >
            <Text>Colors</Text>
          </Button>
          <Button
            style={{ flex: 1, justifyContent: "center", marginHorizontal: 2 }}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Text>Menu</Text>
          </Button>
        </View>
        {this.state.colorViewOpen ? (
          <Colors toogleColorViewOpen={this.toogleColorViewOpen} />
        ) : null}
      </View>
    );
  }
}
Home.navigationOptions = {
  header: null
};

const mapStateToProps = state => ({ user: state.user, profile: state.profile });
const mapActionsToProps = {
  getProfile: getProfile,
  getMeals: getMeals
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Home));
