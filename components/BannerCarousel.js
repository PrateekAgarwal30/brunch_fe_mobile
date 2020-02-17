import React from "react";
import { Text, View, Platform } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Dimensions, StyleSheet } from "react-native";
import { Content } from "native-base";
const { width: screenWidth } = Dimensions.get("window");

export default class MyCarousel extends React.Component {
  state = {
    entries: [
      {
        thumbnail:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
      },
      {
        thumbnail:
          "https://www.telegraph.co.uk/content/dam/music/2016/09/23/nirvana_trans_NvBQzQNjv4Bqeo_i_u9APj8RuoebjoAHt0k9u7HhRJvuo-ZLenGRumA.jpg?imwidth=1400"
      },
      {
        thumbnail:
          "https://www.telegraph.co.uk/content/dam/music/2016/09/23/nirvana5_trans_NvBQzQNjv4BqjJeHvIwLm2xPr27m7LF8mROdhF3LOhhNceUlKlbzGHM.jpg?imwidth=1240"
      },
      {
        thumbnail:
          "https://www.rollingstone.com/wp-content/uploads/2018/06/nirvana-deep-cuts-listen-songs-23b183b6-df23-43f7-9356-bafe4adace9c.jpg?resize=815,458&w=1260"
      }
    ]
  };
  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={5}>
          {item.title}
        </Text>
      </View>
    );
  }

  render() {
    // const screenWidth = '50%';
    return (
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={this.state.entries}
          renderItem={this._renderItem}
          hasParallaxImages={true}
        />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: 250 - 5,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "#E1E0E2",
    borderRadius: 8,
    elevation:2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  }
});
