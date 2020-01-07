import * as React from "react";
import { Image, View, StyleSheet, Alert } from "react-native";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { _uploadImage } from "../redux/actions";
import _ from "lodash";
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white"
  }
});
export default class CustomImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.imageUrl
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        image: nextProps.imageUrl
      });
    }
  }
  render() {
    const { image } = this.state;
    const { disabled } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button transparent disabled={disabled} onPress={this._pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.avatar}
              onError={() => {
                this.setState({ image: null });
              }}
            />
          ) : (
            <Image
              source={require("./../assets/male-avatar.png")}
              style={styles.avatar}
            />
          )}
        </Button>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });
      if (result.didCancel || result.cancelled) {
        // Alert.alert("User Cancelled Image Picker");
      } else if (result.error) {
        Alert.alert("Image Picker Error", result.error);
      } else if (!_.endsWith(result.uri, ".png")) {
        Alert.alert(
          "Image Picker Error",
          "Unsupported file.\nPlease upload only PNG file."
        );
      } else {
        const response = await _uploadImage(result.uri);
        console.log(response);
        if (response._status === "success") {
          this.setState({ image: result.uri });
        } else {
          Alert.alert("Image Picker Error", response._message);
        }
      }
    } catch (err) {
      Alert.alert("Image Picker Error", err.message);
    }
  };
}
