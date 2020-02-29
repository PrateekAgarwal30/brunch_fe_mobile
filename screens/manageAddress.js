import React from "react";
import { Text, StyleSheet, Dimensions, Image, View } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Header,
  Body,
  Button,
  Card,
  CardItem,
  Content,
  Icon,
  Left,
  Right,
  Label
} from "native-base";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { withAppContextConsumer } from "../components/AppContext";
import { LinearGradient } from "expo-linear-gradient";
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
  static navigationOptions = {
    header: null
  };
  _onChangeAddress = () => {
    this.props.navigation.navigate("ChangeAddress");
  };
  render() {
    const address = this.props.profile.addresses;
    const isLoading = this.props.user.isLoading;
    const { themes } = this.props;
    if (isLoading) {
      return <CustomActivityIndicator />;
    }
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "white"
        }}
      >
        <LinearGradient
          colors={[themes["light"].secondary, themes["light"].primary]}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2
          }}
        >
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "white", fontSize: 25 }}
                />
              </Button>
            </Left>
            <Body>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Office Address
              </Text>
            </Body>
            <Right />
          </Header>
        </LinearGradient>
        <Content>
          {address ? (
            <View style={{ marginTop: -10 }}>
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
              <View
                style={{
                  padding: 10,
                  marginTop: -35,
                  backgroundColor: "white",
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  borderRightColor: "red"
                }}
              >
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
              </View>
            </View>
          ) : (
            <View>
              <Content padder>
                <Card style={styles.noImageFoundCard}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require("./../assets/company.png")}
                  />
                  <Text>{"No Address Found!"}</Text>
                </Card>
              </Content>
            </View>
          )}
        </Content>
        <Button
          style={{
            textAlign: "center",
            justifyContent: "center",
            margin: 10,
            backgroundColor: themes["light"].primary
          }}
          onPress={this._onChangeAddress}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            {address ? "Change Address" : "Add Address"}
          </Text>
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(ManageAddress));

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
