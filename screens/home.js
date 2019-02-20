import React from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Button, Header } from "native-base";
import { connect } from "react-redux";
import { DrawerActions } from "react-navigation";
import { Icon, Card } from "native-base";
class Home extends React.Component {
  componentDidMount() {

    this.props.navigation.setParams({
      _menu: this._menu
    });
  }
  _menu = async () => {
    console.log('clicked');
    this.props.navigation.toggleDrawer();
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Header>
          <Button
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Profile</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Profile</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("Profile")}
          >
            <Text>Profile</Text>
          </Button>
          <Button
            onPress={this._menu}
          >
            <Text>Menu</Text>
          </Button>
        </Header>
        <Image style={{ width: 400, height: 400 }} source={require("../assets/workInProgress.png")} />
        <Text>{JSON.stringify(this.props.navigation)}</Text>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
