import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { logOut } from "../redux/actions";
import { Icon, Card } from "native-base";
import _ from 'lodash';
class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            const _logOut = navigation.getParam("_logOut", null);
            if (_logOut) {
              _logOut();
            }
          }}
          style={{ padding: 5, marginRight: 10 }}
        >
          <Icon name="log-out" style={{ color: "#fff" }} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#16235A"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };

  state = {
    addresses: []
  };
  _logOut = async () => {
    try {
      await this.props.logOut();
      if (!(await AsyncStorage.getItem("authToken"))) {
        this.props.navigation.navigate("AuthLoading");
      }
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  };
  async componentDidMount() {
    this.props.navigation.setParams({
      _logOut: this._logOut
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          style={styles.avatar}
          source={require("./../assets/male-avatar.png")}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{_.get(this.props,"profile.details.firstName",this.props.profile.email) || "Guest"}</Text>
          </View>
          <Card style={styles.cardContainer}>
            <ScrollView style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => this.props.navigation.navigate("UserInfo")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="person" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Personal Info</Text>
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
                onPress={() => alert("Clicked")}
              >
                <View style={styles.buttonInsideView}>
                  <Icon name="card" style={{ flex: 1 }} />
                  <Text style={styles.textWrapper}>Payment</Text>
                  <Icon name="ios-arrow-forward" style={{ flex: 1 }} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => alert("Clicked")}
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 40
  },
  // name: {
  //   fontSize: 22,
  //   color: "#FFFFFF",
  //   fontWeight: "600"
  // },
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
    flex: 10
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
  logOut: logOut
};
export default connect(mapStateToProps, mapActionsToProps)(Profile);
