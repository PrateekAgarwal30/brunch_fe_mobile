import React from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Input } from "native-base";
import { MapView, Permissions, Location, Marker } from "expo";
const { width } = Dimensions.get("window");
export const ABCD = function (props) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require("../assets/company.png")} style={{ width: 25, height: 25, marginRight: 15 }} />
                <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 21, color: '#898989', fontWeight: '900' }}>{props.selectedItem[0].techPark}</Text>
            </View>
            <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 16, color: '#898989', fontWeight: '600' }}>{props.selectedItem[0].address}</Text>
            <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 16, color: '#898989', fontWeight: '600' }}>{props.selectedItem[0].area}, {props.selectedItem[0].city}</Text>
            <ScrollView>
                {
                    props.selectedItem[0].stall_locations.map((x) => {
                        return (
                            <TouchableOpacity style={{ padding: 10 }} key={x._id} onPress={() => {}}>
                                <Text style={{ fontFamily: 'sans-serif-thin', fontSize: 16, color: '#858585', fontWeight: '900' }} >
                                    {x.tag}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: (width - 40),
        top: 60,
        left: 20,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1,
        maxHeight: 320,
        padding:10
    }
})


