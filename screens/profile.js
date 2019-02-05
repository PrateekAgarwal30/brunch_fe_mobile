import React from "react";
import { Text, View, TouchableHighlight,TouchableOpacity,FlatList } from "react-native";
import { connect } from "react-redux";
import { getProfile } from "../redux/actions";
import { Button, List, ListItem } from "native-base";
class Profile extends React.Component {
  state = {
    addresses: []
  };
  componentWillMount() {
    this.props
      .getProfile(this.props.user.jwtToken)
      .then(res => {
        this.setState({
          ...this.state,
          ...this.props.profile
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  _onPressButton = ({item}) => {
    console.log(item);
    this.props.navigation.navigate("Address");
  }
  _renderItem = ({item})=>{
    return <Text onPress={this._onPressButton}>{JSON.stringify(item)}</Text>
  }
  _keyExtractor = (item,index)=> item._id;
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        <Button onPress={() => this.props.navigation.navigate("Address")}>
          <Text>Address</Text>
        </Button>
        <List>
          {this.state.addresses.map(m => {
            return (
              <FlatList
                data={this.state.addresses}
                renderItem={this._renderItem}
                keyExtractor = {this._keyExtractor}
              />
            );
          })}
        </List>
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
