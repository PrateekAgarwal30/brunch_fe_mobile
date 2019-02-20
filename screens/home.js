import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import Separator from "../components/Separator";
const { width, height } = Dimensions.get("window")
import { DrawerActions } from "react-navigation";
class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 400, height: 400 }} source={require("../assets/workInProgress.png")} />
        <Button
          onPress={() => this.props.navigation.navigate("Profile")}
        >
          <Text>Profile</Text>
        </Button>
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
