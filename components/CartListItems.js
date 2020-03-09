import React from "react";
import * as Animatable from "react-native-animatable";
import { Text, View, Dimensions } from "react-native";
import QuantityBox from "./QuantityBox";
import _ from "lodash";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  ShineOverlay
} from "rn-placeholder";
const { width } = Dimensions.get("screen");
export const CartListItem = ({ mealData }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 2.5,
        marginHorizontal: 7.5,
        borderRadius: 10
      }}
    >
      <Animatable.View
        animation="fadeIn"
        iterationCount={1}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Animatable.Image
          source={{ uri: `${mealData.mealThumbnailUrl}` }}
          style={{ height: 75, width: 105, borderRadius: 10 }}
          iterationCount={1}
          animation={"fadeIn"}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            marginHorizontal: 5,
            marginVertical: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              maxWidth: 195,
              alignSelf: "flex-start"
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                marginLeft: 10,
                fontWeight: "bold",
                width: "90%"
              }}
            >
              {mealData.name}
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 12,
                marginLeft: 10,
                fontWeight: "bold",
                alignSelf: "center"
              }}
            >
              {`${mealData.price} ₹`}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 5,
              marginVertical: 5
            }}
          >
            <Text
              style={{
                color: "grey",
                fontSize: 12,
                marginLeft: 10,
                fontWeight: "bold",
                textAlignVertical: "center"
              }}
            >
              {`Item Total:`}
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 16,
                marginLeft: 10,
                fontWeight: "bold",
                textAlignVertical: "center"
              }}
            >
              {`${mealData.itemTotalPrice} ₹`}
            </Text>
            <QuantityBox mealId={mealData._id} quantity={mealData.quantity} />
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export const NoCartListItem = () => {
  return (
    <View>
      <Placeholder
        Animation={ShineOverlay}
        style={{
          backgroundColor: "white",
          width: width / 2,
          // height: 200,
          flex: 1
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ margin: 2.5 }}>
            <PlaceholderMedia
              size={width / 2 - 15}
              style={{ height: 125, margin: 5 }}
            />
            <PlaceholderLine />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10
              }}
            >
              <PlaceholderLine width={20} height={20} />
              <PlaceholderLine width={20} height={20} />
            </View>
          </View>
          <View style={{ margin: 2.5 }}>
            <PlaceholderMedia
              size={width / 2 - 15}
              style={{ height: 125, margin: 5 }}
            />
            <PlaceholderLine />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10
              }}
            >
              <PlaceholderLine width={20} height={20} />
              <PlaceholderLine width={20} height={20} />
            </View>
          </View>
        </View>
      </Placeholder>
      <Placeholder
        Animation={ShineOverlay}
        style={{
          backgroundColor: "white",
          width: width / 2,
          // height: 200,
          flex: 1
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ margin: 2.5 }}>
            <PlaceholderMedia
              size={width / 2 - 15}
              style={{ height: 125, margin: 5 }}
            />
            <PlaceholderLine />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10
              }}
            >
              <PlaceholderLine width={20} height={20} />
              <PlaceholderLine width={20} height={20} />
            </View>
          </View>
          <View style={{ margin: 2.5 }}>
            <PlaceholderMedia
              size={width / 2 - 15}
              style={{ height: 125, margin: 5 }}
            />
            <PlaceholderLine />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10
              }}
            >
              <PlaceholderLine width={20} height={20} />
              <PlaceholderLine width={20} height={20} />
            </View>
          </View>
        </View>
      </Placeholder>
    </View>
  );
};

export const CartAmountDetails = ({ priceDetails }) => {
  if (_.isEqual(priceDetails, {})) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 5,
        marginHorizontal: 7.5,
        borderRadius: 10,
        padding: 10
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Items Total</Text>
        <Text style={{ fontWeight: "bold" }}>
          {(priceDetails.totalCartItemPrice || 0).toFixed(2)}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Taxes</Text>
        <Text style={{ fontWeight: "bold" }}>
          {(priceDetails.taxAmount || 0).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 3,
          marginTop: 3,
          borderTopColor: "grey",
          borderTopWidth: 1
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Grand Total</Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {(priceDetails.totalCartPrice || 0).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
