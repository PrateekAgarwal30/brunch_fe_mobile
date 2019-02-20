import React from "react";
import {
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
class UserInfo extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <View>
        <Text>A</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserInfo);
