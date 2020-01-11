import * as React from "react";
import { Image, View, StyleSheet, Alert } from "react-native";
import ImageLoad from "react-native-image-placeholder";
import { Button, Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { _uploadImage } from "../redux/actions";
import _ from "lodash";
const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63
  },
  avatarWrapper: {
    width: 108,
    height: 108,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#A4A4BF",
    backgroundColor: "#A4A4BF"
  },
  editIcon: {
    color: "#A4A4BF",
    fontSize: 28,
    position: "absolute",
    left: -6,
    bottom: -12,
    elevation: 3,
    padding: 5,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -1, height: 5 },
    textShadowRadius: 10
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
        <Button
          transparent
          style={styles.avatarWrapper}
          disabled={disabled}
          onPress={this._pickImage}
        >
          {disabled ? null : <Icon name="create" style={styles.editIcon} />}

          {image ? (
            <ImageLoad
              source={{ uri: image }}
              style={styles.avatar}
              borderRadius={65}
              loadingStyle={{ size: "large", color: "white" }}
              placeholderSource={require("./../assets/male-avatar.png")}
              placeholderStyle={styles.avatar}
              isShowActivity={true}
            />
          ) : (
            <ImageLoad
              source={require("./../assets/male-avatar.png")}
              style={styles.avatar}
              borderRadius={65}
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
    try {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    } catch (err) {
      console.log(err.message);
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
      } else if (
        !(_.endsWith(result.uri, ".png") || _.endsWith(result.uri, ".jpg"))
      ) {
        Alert.alert(
          "Image Picker Error",
          "Unsupported file.\nPlease upload only PNG/JPG file."
        );
      } else {
        const response = await _uploadImage(result.uri);
        // console.log(response);
        if (response._status === "success") {
          this.setState({ image: result.uri });
          this.props.onUploadImageSuccess();
        } else {
          Alert.alert("Image Picker Error", response._message);
        }
      }
    } catch (err) {
      Alert.alert("Image Picker Error", err.message);
    }
  };
}
