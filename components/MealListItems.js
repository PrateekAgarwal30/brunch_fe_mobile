import React from "react";
import * as Animatable from "react-native-animatable";
import { Text, View, TouchableHighlight, Dimensions } from "react-native";
import { ipAddress } from "../constants";
import QuantityBox from "./QuantityBox";
const { width } = Dimensions.get("screen");
export const MealsListItem = ({ mealData }) => {
  return (
    <Animatable.View animation="fadeIn" iterationCount={1}>
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
        <View>
          <Animatable.Image
            source={{ uri: `${ipAddress}/${mealData.mealImageUrl}` }}
            style={{ height: 125, width: "100%", borderRadius: 10 }}
            iterationCount={1}
            animation={"fadeIn"}
          />
          <Text
            style={{
              color: "grey",
              fontSize: 13,
              marginLeft: 10,
              fontWeight: "bold"
            }}
          >
            {mealData.name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 5,
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: 18,
                marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              {mealData.price} ₹
            </Text>
            <QuantityBox />
          </View>
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );
};
