import * as React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
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
  state = {
    image: null
  };
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        image: nextProps.imageUrl
      });
    }
  }
  render() {
    const { image } = this.state;
    console.log("image",image);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button transparent onPress={this._pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
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
    console.log("_pickImage clicked");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    console.log("result", result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
