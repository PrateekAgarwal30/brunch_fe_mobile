import React from "react";
import { Text, View, Image } from "react-native";
import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Right,
  Label
} from "native-base";
import { connect } from "react-redux";
import { getProfile } from "../redux/actions";
import { Notifications } from "expo";
import { NetworkConsumer } from "./../components/NetworkContext";
import Colors from "./../components/Colors";
import BannerCarousel from "./../components/BannerCarousel";
import Constants from "expo-constants";
class Home extends React.Component {
  state = {
    colorViewOpen: false
  };

  toogleColorViewOpen = () => {
    this.setState(prevSate => ({
      colorViewOpen: !prevSate.colorViewOpen
    }));
  };

  async componentDidMount() {
    try {
      this.props.getProfile();
    } catch (err) {
      console.log(err.message);
    }
    // Notifications.addListener(payload => console.log(JSON.stringify(payload)));
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  render() {
    return (
      <Container
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "white",
          marginTop: Constants.statusBarHeight
        }}
      >
        <Button
          transparent
          style={{ position: "absolute", top: 0, zIndex: 1,marginTop:5,marginLeft:2.5,elevation:1,backgroundColor:'#16235A'}}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <Icon name="menu" style={{ color: "#E1E0E2", fontSize: 25,margin:0,padding:0 }} />
        </Button>
        <BannerCarousel />
        <Button onPress={() => this.props.navigation.navigate("Profile")}>
          <Text>Profile</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate("Wallet")}>
          <Text>Wallet</Text>
        </Button>
        <Button onPress={this.toogleColorViewOpen}>
          <Text>Colors</Text>
        </Button>
        <Button onPress={this._menu}>
          <Text>Menu</Text>
        </Button>

        {this.state.colorViewOpen ? (
          <Colors toogleColorViewOpen={this.toogleColorViewOpen} />
        ) : null}
      </Container>
    );
  }
}
Home.navigationOptions = {
  header: null
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
