import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import Separator from "../components/Separator";
class Home extends React.Component {
    render() {
        return (
          <View>
            <Text>Home Screen</Text>
            <Button
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <Text>Profile</Text>
            </Button>
            <Text>{JSON.stringify(this.props.user)}</Text>
            <Text>{JSON.stringify(this.props.profile)}</Text>
            <Separator />
          </View>
        );
    }
};

const mapStateToProps = state => ({
    user : state.user,
    profile : state.profile
});
const mapActionsToProps = {
};
export default connect(
    mapStateToProps,
    mapActionsToProps
)(Home);
