import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { getProfile } from "../redux/actions";
class Profile extends React.Component {
  state = {};
  componentWillMount() {
    this.props
      .getProfile(this.props.user.jwtToken)
      .then(res => {
        // this.setState({
        //   ...this.state,
        //   ...this.props.profile
        // });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  render() {
    return (
      <View>
        {/* <Text>
          Name : {this.props.user.details.firstName || ""}{" "}
          {this.props.user.details.lastName || ""}
        </Text> */}
        <Text>Email : {this.props.profile.email || ""}</Text>
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
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Profile);
