import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { MapView, Location, Permissions } from "expo";
import { Marker } from "react-native-maps";
class GetLocation extends React.Component {
  state = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  componentWillMount() {
    this.alertIfRemoteNotificationsDisabledAsync();
    this.getLocationHandler();
  }
  alertIfRemoteNotificationsDisabledAsync = async () => {
    try {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        Alert.alert(
          "Hey! You might want to enable notifications for my app, they are good."
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  getLocationAsync = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === "granted") {
        return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      } else {
        throw new Error("Location permission not granted");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  getLocationHandler = async () => {
    try {
      const coords = await this.getLocationAsync();
      // console.log(coords);
      if (coords) {
        this.setState({
          ...this.state,
          latitude: coords.coords.latitude,
          longitude: coords.coords.longitude
        });
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={this.state}
          loadingEnabled={true}
          paddingAdjustmentBehavior="automatic"
          customMapStyle={[
            {
              featureType: "administrative",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#444444"
                }
              ]
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {
                  color: "#f2f2f2"
                }
              ]
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [
                {
                  saturation: -100
                },
                {
                  lightness: 45
                }
              ]
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified"
                }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {
                  color: "#46bcec"
                },
                {
                  visibility: "on"
                }
              ]
            }
          ]}
        />
        <Marker coordinate={this.state}></Marker>
        <View>
          <Text>{JSON.stringify(this.state)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%"
  }
});
const mapStateToProps = state => ({
  profile: state.profile
});
const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(GetLocation);
