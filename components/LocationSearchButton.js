import React from "react";

import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Input } from "native-base";
const { width } = Dimensions.get("window");
export const LocationSearchButton = function (props) {
    return (
        <TouchableOpacity onPress={() => { }} style={styles.container}>
            <View style={styles.leftCol}>
                <Ionicons name="md-search" color="#000000" size={25} style={{alignSelf:'center'}}/>
            </View>
            <View style={styles.rightCol}>
                <Input placeholder={'Search Tech Park'} onChangeText={props._searchLocation}style={{ fontFamily: 'sans-serif-thin', fontSize: 21, color: '#898989',fontWeight:'900' }}/>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: (width - 40),
        height: 60,
        top: 60,
        left: 20,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: '#000000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1
    },
    leftCol: {
        flex: 1,
    },
    rightCol: {
        flex: 5,
        borderLeftWidth: 1,
        borderColor: "black",
        paddingLeft:10
    }
})