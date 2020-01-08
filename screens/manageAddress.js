import React from "react";
import { Text, StyleSheet, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Label,
  Container
} from "native-base";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import MapView from "react-native-maps";
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  map: {
    width: width,
    height: 300
  },
  cardContainer: {
    marginTop: 10,
    elevation: 3
  },
  textStyle: {
    fontSize: 16
  },
  labelStyle: {
    color: "#575757",
    fontSize: 16,
    textDecorationStyle: "solid"
  },
  cardBody: {
    paddingTop: 3,
    paddingBottom: 3
  },
  noImageFoundCard: {
    marginTop: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    minHeight: 300
  }
});

class ManageAddress extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Manage Office Address",
      headerStyle: {
        backgroundColor: "#16235A"
      },
      headerTintColor: "white",
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
    if (isLoading) {
      return <CustomActivityIndicator />;
    }
    return (
      <Container
        style={{
          flex: 1,
          zIndex: 0
        }}
      >
        {address ? (
          <Container>
            <MapView
              style={styles.map}
              initialRegion={{
                ...address.stall_loc_id.location,
                latitudeDelta: 0.005,
                longitudeDelta: 0.01121
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
              zoomEnabled={false}
              scrollEnabled={false}
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
            <Content padder>
              <Card style={styles.cardContainer}>
                <CardItem bordered style={styles.cardBody}>
                  <Body>
                    <Label style={styles.labelStyle}>{`Stall : `}</Label>
                    <Text
                      style={styles.textStyle}
                    >{`${address.stall_loc_id.tag}`}</Text>
                  </Body>
                </CardItem>
                <CardItem bordered style={styles.cardBody}>
                  <Body>
                    <Label style={styles.labelStyle}>{`Tech Park : `}</Label>
                    <Text
                      style={styles.textStyle}
                    >{`${address.tech_park_id.techPark}`}</Text>
                  </Body>
                </CardItem>
                <CardItem
                  bordered
                  style={{ ...styles.cardBody, paddingBottom: 6 }}
                >
                  <Body>
                    <Label style={styles.labelStyle}>{`Address : `}</Label>
                    <Text
                      style={styles.textStyle}
                    >{`${address.tech_park_id.address}, ${address.tech_park_id.area}, ${address.tech_park_id.city}`}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Content>
          </Container>
        ) : (
          <Container>
            <Content padder>
              <Card style={styles.noImageFoundCard}>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={require("./../assets/company.png")}
                />
                <Text>{"No Address Found!"}</Text>
              </Card>
            </Content>
          </Container>
        )}
        <Content
          padder
          style={{ position: "absolute", width: "100%", bottom: 0, left: 0 }}
        >
          <Button
            style={{
              textAlign: "center ",
              justifyContent: "center"
            }}
            onPress={this._onChangeAddress}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              {address ? "Change Address" : "Add Address"}
            </Text>
          </Button>
        </Content>
      </Container>
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
