import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Button, Header } from "native-base";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { getProfile } from "../redux/actions";
class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            const _menu = navigation.getParam("_menu", null);
            if (_menu) {
              _menu();
            }
          }}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Icon name="menu" style={{ color: "white" }} />
        </TouchableOpacity>
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
  async componentDidMount() {
    try {
      this.props.navigation.setParams({
        _menu: this._menu
      });
      this.props.getProfile();
    } catch (err) {
      console.log(err.message);
    }
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  _menu = async () => {
    try {
      this.props.navigation.toggleDrawer();
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

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
  getProfile: getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
