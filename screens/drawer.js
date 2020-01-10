import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Icon, Card } from "native-base";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { getProfile, logOut, pushNotifToken } from "../redux/actions";
import _ from "lodash";
import CustomImagePicker from "../components/CustomImagePicker";
import { ipAddress } from "../constants";
class Drawer extends React.Component {
  async componentDidMount() {
    try {
      const result = await this.registerForPushNotificationsAsync();
      if (result) {
        this.props.pushNotificationToken(result);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      return token;
    } catch (err) {
      return;
    }
  };
  render() {
    const imageUrl =
      _.get(this.props, "profile.details.userImageUrl", "") || "";
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <CustomImagePicker
          disabled={true}
          imageUrl={imageUrl ? `${ipAddress}${imageUrl}` : null}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {_.get(
                this.props,
                "profile.details.firstName",
                this.props.profile.email
              ) || "Guest"}
            </Text>
          </View>
          {/* <Text>{JSON.stringify(this.props.navigation)}</Text> */}
          <Card style={styles.cardContainer}>
            <ScrollView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="person" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Profile</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.props.navigation.navigate("ManageAddress")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="map" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Manage Addresses</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => Alert.alert("Clicked")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="card" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Payment</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => Alert.alert("Clicked")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="heart" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Favourite</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.props.navigation.navigate("ChangePassword")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="keypad" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Change Password</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#16235A",
    height: 100
  },
  body: {
    marginTop: 20
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 20
  },
  textWrapper: {
    fontSize: 18,
    // padding : 20,
    // textAlign: 'center',
    marginLeft: 5,
    flex: 7
  },
  buttonWrapper: {
    marginBottom: 20,
    backgroundColor: "#A4A4BF",
    borderRadius: 5
  },
  buttonInsideView: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  cardContainer: {
    marginTop: 30,

    paddingLeft: 15,
    paddingRight: 15
  }
});
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
const mapActionsToProps = {
  getProfile: getProfile,
  logOut: logOut,
  pushNotificationToken: pushNotifToken
};
export default connect(mapStateToProps, mapActionsToProps)(Drawer);
