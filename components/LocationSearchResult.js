import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Input } from "native-base";
const { width } = Dimensions.get("window");

export const LocationSearchResult = function (props) {
    return (
        <View style={[styles.container,{
            borderTopWidth: (props.results.length > 0) ? 1 : 0,
            borderTopColor:"#898989"
        }]}>
            {
                props.results.map((x) => {
                    return (
                        <TouchableOpacity style={{ padding: 10 }} key={x._id} onPress={()=>props._selectLocation(x._id)}>
                            <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 16, color: '#858585', fontWeight: '900' }} >
                                {x.techPark}
                            </Text>
                            <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 12, color: '#858585', fontWeight: '600' }} >
                                {x.address}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: (width - 40),
        top: 120,
        left: 20,
        borderRadius: 2,
        backgroundColor: 'white',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1,
    }
})