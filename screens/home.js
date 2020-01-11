import React from "react";
import { Text, View, Image } from "react-native";
import { Button, Header } from "native-base";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { getProfile } from "../redux/actions";
import { Notifications } from "expo";
import { NetworkConsumer } from "./../components/NetworkContext";
class Home extends React.Component {
  async componentDidMount() {
    try {
      this.props.navigation.setParams({
        _menu: this._menu
      });
      this.props.getProfile();
    } catch (err) {
      console.log(err.message);
    }
    Notifications.addListener(payload => console.log(JSON.stringify(payload)));
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  _menu = async () => {
    try {
      this.props.navigation.openDrawer();
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Header>
          <Button onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Profile</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Payments")}>
            <Text>Payments</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Profile</Text>
          </Button>
          <Button onPress={this._menu}>
            <Text>Menu</Text>
          </Button>
        </Header>
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../assets/workInProgress.png")}
        />
        {/* <Text>{JSON.stringify(this.props.navigation)}</Text> */}
      </View>
    );
  }
}
Home.navigationOptions = ({ navigation }) => {
  return {
    title: "Home",
    headerLeft: (
      <Button
        transparent
        onPress={() => {
          const _menu = navigation.getParam("_menu", null);
          if (_menu) {
            _menu();
          }
        }}
      >
        <Icon name="menu" style={{ color: "white", fontSize: 25 }} />
      </Button>
    ),
    headerStyle: {
      backgroundColor: "#16235A"
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};
Home.contextType = NetworkConsumer;

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
  getProfile: getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
