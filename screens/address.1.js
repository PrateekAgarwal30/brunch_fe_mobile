import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card, CardItem, Icon } from 'native-base'
class Address1 extends React.PureComponent {
  _keyExtractor = (item, index) => item._id;

  _onPressItem = item => {
    console.log(item.key);
  };
  _renderItem = ({ item }) => (
    <Card>
      <CardItem header>
        <Icon name="ios-home" />
        <Text>{item.tag}</Text>
      </CardItem>
      <CardItem>
        <TouchableOpacity id={item._id} onPress={() => this._onPressItem(item)}>
          <Text>{JSON.stringify(item)}</Text>
        </TouchableOpacity>
      </CardItem>
      <CardItem footer>
        <Text>Edit</Text>
      </CardItem>
    </Card>
  );
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("GetLocation")}>
          <Text>Add New Address</Text>
        </TouchableOpacity>
        <FlatList
          data={this.props.profile.addresses.map(a => ({
            ...a,
            key: a._id
          }))}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.profile
});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Address);



