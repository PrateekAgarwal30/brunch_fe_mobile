import React from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { connect } from "react-redux";
import { getTechAddresses, saveOfficeAddressForUser,getProfile } from "../redux/actions";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LocationSearchButton } from "../components/LocationSearchButton";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { LocationSearchResult } from "../components/LocationSearchResult";
import { SelectStallLocation } from "../components/SelectStallLocation";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import _ from "lodash";
class ChangeAddress extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Select Office",
      headerStyle: {
        backgroundColor: "#16235A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 12.9696895,
        longitude: 77.5880735,
        latitudeDelta: 0.0921,
        longitudeDelta: 0.0921
      },
      tech_parks: [],
      filtersParks: [],
      selected: false,
      selectedItem: []
    };
    this._getLocationAsync();
    this._selectLocation = this._selectLocation.bind(this);
  }
  async componentDidMount() {
    await this.props.getTechAddresses();
    this.setState({
      ...this.state,
      tech_parks: this.props.profile.tech_addresses || []
    });
  }
  _searchLocation = x => {
    let filtersParks = this.state.tech_parks.filter(tp => {
      return tp.techPark.toLowerCase().indexOf(x.toLowerCase()) > -1;
    });
    this.setState({
      ...this.state,
      filtersParks: filtersParks
    });
  };
  _selectLocation(x) {
    const selectedTechPark = this.state.tech_parks.filter(y => y._id === x);
    // this.props.navigation.navigate('GetLocation'); const {latitude,longitude} =
    // _.get(selectedTechPark[0],"tPark_location"); this.map.animateCamera({ center:
    // selectedTechPark[0].tPark_location});
    this.setState({
      ...this.state,
      selected: true,
      selectedItem: selectedTechPark
    });
  }
  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      let region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0221,
        longitudeDelta: 0.0221
      };
      this.setState({
        ...this.state,
        region: region
      });
    } else {
      throw new Error("Location permission not granted");
    }
  };
  centerMap() {
    let latitude = 0;
    let longitude = 0;
    if (this.state.selected) {
      latitude = _.get(this.state.selectedItem[0], "tPark_location").latitude;
      longitude = _.get(this.state.selectedItem[0], "tPark_location").longitude;
    } else {
      latitude = this.state.region.latitude;
      longitude = this.state.region.longitude;
    }
    this.map.animateCamera({
      center: {
        latitude,
        longitude
      }
    });
  }
  onConfirmLocation = async (stall_loc_id, tech_park_id) => {
    // console.log(stall_id,tech_park_id);
    this.props
      .saveOfficeAddressForUser({ tech_park_id, stall_loc_id })
      .then(message => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
        this.setState(prevState => ({
          ...prevState,
          selected: false
        }));
        this.props.getProfile();
        this.props.navigation.navigate("ManageAddress");
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };
  render() {
    const isLoading = this.props.user.isLoading;
    if (isLoading || !this.state.tech_parks.length) {
      return <CustomActivityIndicator />;
    }
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0
        }}
      >
        {this.state.selected ? (
          <View>
            <SelectStallLocation
              selectedItem={this.state.selectedItem}
              onConfirmLocation={this.onConfirmLocation}
            />
            <CurrentLocationButton
              bottom={130}
              cb={() => {
                this.centerMap();
              }}
            />
          </View>
        ) : (
          <View>
            <LocationSearchButton _searchLocation={this._searchLocation} />
            <LocationSearchResult
              results={this.state.filtersParks}
              _selectLocation={x => this._selectLocation(x)}
            />
            <CurrentLocationButton
              bottom={130}
              cb={() => {
                this.centerMap();
              }}
            />
          </View>
        )}
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          showsCompass={true}
          rotateEnabled={false}
          showsUserLocation={true}
          region={
            this.state.selected
              ? {
                  latitude: _.get(
                    this.state.selectedItem[0],
                    "tPark_location.latitude"
                  ),
                  longitude: _.get(
                    this.state.selectedItem[0],
                    "tPark_location.longitude"
                  ),
                  latitudeDelta: 0.00121,
                  longitudeDelta: 0.00121
                }
              : this.state.region
          }
          ref={map => {
            this.map = map;
          }}
          customMapStyle={mapStyle}
        >
          {this.state.tech_parks.map(x => (
            <MapView.Marker
              key={x._id}
              zIndex={9}
              coordinate={{
                latitude: x.tPark_location.latitude,
                longitude: x.tPark_location.longitude
              }}
              title={x.techPark}
              pointerEvents="none"
              onPress={x => {}}
            ></MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {
  getTechAddresses: getTechAddresses,
  saveOfficeAddressForUser: saveOfficeAddressForUser,
  getProfile : getProfile
};
export default connect(mapStateToProps, mapActionsToProps)(ChangeAddress);

var mapStyle = [
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