import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "native-base";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import MapView from "react-native-maps";
const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 300
  }
});

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
    this.props.navigation.navigate("ChangeAddress");
  };
  render() {
    const address = this.props.profile.addresses;
    const isLoading = this.props.user.isLoading;
    if (isLoading || !address) {
      return <CustomActivityIndicator />;
    }
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 12,
            longitude: 77,
            latitudeDelta: 0.00121,
            longitudeDelta: 0.00121
          }}
          showsCompass={true}
          rotateEnabled={false}
          showsUserLocation={true}
          region={{
            ...address.stall_loc_id.location,
            latitudeDelta: 0.01121,
            longitudeDelta: 0.01121
          }}
          ref={map => {
            this.map = map;
          }}
          customMapStyle={mapStyle}
        >
          {address.stall_loc_id.location && (
            <MapView.Marker
              // key={x._id}
              zIndex={9}
              coordinate={address.stall_loc_id.location}
              title={`${address.stall_loc_id.tag}, ${address.tech_park_id.techPark}`}
              pointerEvents="none"
              onPress={x => {}}
            ></MapView.Marker>
          )}
        </MapView>

        <Text>{`Tech Park : ${address.tech_park_id.techPark}`}</Text>
        <Text>{`Address : ${address.tech_park_id.address}`}</Text>
        <Text>{`Area : ${address.tech_park_id.area}`}</Text>
        <Text>{`City : ${address.tech_park_id.city}`}</Text>
        <Text>{`Tag : ${address.stall_loc_id.tag}`}</Text>
        <Text>{`Stall Location : ${JSON.stringify(
          address.stall_loc_id.location,
          null,
          2
        )}`}</Text>
        {/* <Text>{JSON.stringify(address, null, 2)}</Text> */}
        <Button onPress={this._onChangeAddress}>
          <Text>{"Change Address"}</Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {};
export default connect(mapStateToProps, mapActionsToProps)(ManageAddress);

const mapStyle = [
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
        visibility: "simplified"
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
        visibility: "simplified"
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
];
