import React from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import _ from "lodash";
const styles = StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  container: {
    backgroundColor: "#e1e4e8"
  }
});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start();
  };

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start();
  };
  shouldComponentUpdate(nextProps) {
    const nextUri = nextProps.source.uri;
    const currentUri = this.props.source.uri;
    if (_.startsWith(nextUri, "file:")) {
      this.image = true;
      return true;
    } else if (this.image) {
      return false;
    } else {
      return nextUri !== currentUri;
    }
  }
  render() {
    const { thumbnailSource, source, style, ...props } = this.props;
    // console.log(source);
    return (
      <View style={[styles.container, props.backgroundStyle]}>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        {/* <Image
          {...props}
          source={source}
          style={[styles.imageOverlay, style]}
          onLoad={this.onImageLoad}
        /> */}
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default ProgressiveImage;
