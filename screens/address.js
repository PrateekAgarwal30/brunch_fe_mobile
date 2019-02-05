import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { connect } from "react-redux";
import { Input } from "native-base";
class Address extends Component {
  state = {
    mapRegion: {
      latitude: 12.9664383,
      longitude: 77.5903554,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      address : "Losal"
    }
  };
  componentWillMount() {
  }
  getLosalLocation = async (address) => {
    const mapRegion = await Expo.Location.geocodeAsync(address);
    console.log(mapRegion);
    this.setState({
      mapRegion: { ...this.state.mapRegion, ...mapRegion[0] }
    });
  };
  render() {
    return (
      <View style={styles.container}>
      <Text>Hi</Text>
        <Input
        style={{borderBottomColor : "black"}}
          onChangeText={this.getLosalLocation}
        />
        <Text>{JSON.stringify(this.props.profile)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});
mapStateToProps = state => ({
  profile : state.profile
});
mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Address);
