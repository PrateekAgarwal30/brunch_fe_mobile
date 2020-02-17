import React from "react";
import { Text, TextInput } from "react-native";
import {
  Container,
  Header,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Card
} from "native-base";
import { connect } from "react-redux";
import { getProfile } from "../redux/actions";
// import { Notifications } from "expo";
import { NetworkConsumer } from "./../components/NetworkContext";
import Colors from "./../components/Colors";
import BannerCarousel from "./../components/BannerCarousel";
// import Constants from "expo-constants";
class Home extends React.Component {
  state = {
    colorViewOpen: false,
    searchText: ""
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
  _SearchTextHandler = text => {
    this.setState(prevState => ({
      ...prevState,
      searchText: text
    }));
  };
  render() {
    return (
      <Container
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "#EDEEF1"
        }}
      >
        <Header transparent style={{ alignContent: "flex-start",marginBottom:5 }}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              style={{
                marginTop: 5,
                marginLeft: 2.5,
                paddingLeft: 12.5,
                paddingRight: 12.5,
                backgroundColor: "#16235A"
              }}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon
                name="menu"
                style={{
                  color: "#E1E0E2",
                  fontSize: 20,
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
          >
            <Card
              padd
              style={{
                flexDirection: "row",
                marginBottom: 0,
                marginRight: 0
              }}
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
            </Card>
          </Body>
          <Right style={{ flex: 0 }} />
        </Header>
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

const mapStateToProps = state => ({ user: state.user, profile: state.profile });
const mapActionsToProps = {
  getProfile: getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(Home);
