import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Constants, MapView, Location, Permissions } from "expo";
import { connect } from "react-redux";
import { Input } from "native-base";
import { Marker, Callout, Polygon, Polyline } from "react-native-maps";
class Address extends Component {
  state = {
    mapRegion: {
      latitude: 12.9664383,
      longitude: 77.5903554,
      latitudeDelta: .0241,
      longitudeDelta: 0.0421,
      address: "Losal",
    },
    position: {
      x: 0,
      y: 0
    }
  };
  componentWillMount() {
    this._getLocationAsync();
  }
  getLosalLocation = async (address) => {
    const mapRegion = await Expo.Location.geocodeAsync(address);
    console.log(mapRegion);
    this.setState({
      mapRegion: { ...this.state.mapRegion, ...mapRegion[0] }
    });
  };
  _onPress = (e) => {
    console.log("e",e.nativeEvent);
    this.setState({
      ...this.state, position: e.nativeEvent.position
    })
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
  render() {
    return (
      <MapView
        style={styles.map}
        showsUserLocation={false}
        followUserLocation={false}
        zoomEnabled={true}
        initialRegion={this.state.mapRegion}
        onPress={this._onPress}
      >
        <Marker
          pinColor="skyblue"
          coordinate={this.state.mapRegion}
          opacity={0.75}
          onPress={this._onPress}
          onDrag={this._onPress}
        />
        <Polyline
          coordinates={[
            {
              latitude: 12.9664383,
              longitude: 77.5903554
            },
            {
              latitude: 12.9564383,
              longitude: 77.6003554
            }
          ]}
          lineCap="square"
        />
        <Text>{JSON.stringify(this.state)}</Text>
      </MapView>
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
  },
  map: {
    height: 400,
    marginTop: 80
  }
});
mapStateToProps = state => ({
  profile: state.profile
});
mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(Address);
