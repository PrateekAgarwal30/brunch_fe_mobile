import React from "react";
import {View,Text} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "native-base";
class ManageAddress extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Manage Office Address",
      headerStyle: {
        backgroundColor: "#16235A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  _onChangeAddress = () => {
    this.props.navigation.navigate("ChangeAddress")
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0
        }}
      >
        <Button onPress={this._onChangeAddress}><Text>{'Change Address'}</Text></Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {
};
export default connect(mapStateToProps, mapActionsToProps)(ManageAddress);
