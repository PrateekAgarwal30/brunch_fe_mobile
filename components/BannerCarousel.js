import React from "react";
import { Text, View, Platform } from "react-native";
import Carousel, {
  ParallaxImage,
  Pagination
} from "react-native-snap-carousel";
import { Dimensions, StyleSheet } from "react-native";
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
  pagination = () => {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide || 0}
        containerStyle={{
          paddingVertical: 7
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "#E19D40"
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.5}
      />
    );
  };

  render() {
    return (
      <View>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={this.state.entries}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          onSnapToItem={index =>
            this.setState({ ...this.state, activeSlide: index })
          }
          containerCustomStyle={{ marginBottom: -20 }}
        />
        {this.pagination()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: 200
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "#E1E0E2",
    borderRadius: 8,
    elevation: 2,
    width: screenWidth - 12,
    alignSelf: "center"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  }
});
