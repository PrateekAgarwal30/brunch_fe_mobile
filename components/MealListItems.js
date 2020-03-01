import React from "react";
import * as Animatable from "react-native-animatable";
import { Text, View, TouchableHighlight, Dimensions } from "react-native";
import { ipAddress } from "../constants";
const { width } = Dimensions.get("screen");
export const MealsListItem = ({ mealData }) => {
  return (
    <Animatable.View animation="fadeInDownBig" iterationCount={1}>
      <TouchableHighlight
        onPress={() => {
          console.log(mealData._id);
        }}
        underlayColor={"#E1E0E2"}
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          marginVertical: 2.5,
          marginHorizontal: 2.5,
          width: width / 2 - 5
        }}
      >
        <View
          style={{
            alignItems: "center"
          }}
        >
          <Animatable.Image
            source={{ uri: `${ipAddress}/${mealData.mealImageUrl}` }}
            style={{ height: 100, width: "100%", borderRadius: 10 }}
            iterationCount={1}
            animation={"zoomIn"}
          />
          <Text
            style={{
              color: "grey",
              fontSize: 18,
              marginLeft: 20
            }}
          >
            {JSON.stringify(mealData)}
          </Text>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );
};
