import React from "react";
import { Text, View, Dimensions } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import Separator from "../components/Separator";
const { width, height } = Dimensions.get("window")
class Home extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
      <View style={{ flexDirection: 'row', flex: 2 }}>
        <View style={{ width: width * 0.5, height: width * 0.5, flex: 1, backgroundColor: 'grey' }}><Text>1</Text></View>
        <View style={{ width: width * 0.5, height: width * 0.5, flex: 1, backgroundColor: 'grey' }}><Text>2</Text></View>
      </View>
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
