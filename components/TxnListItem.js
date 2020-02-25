import React from "react";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import {Text, StyleSheet, View, TouchableHighlight} from "react-native";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#EDEEF1",
        paddingVertical: 5,
        borderRadius: 5
    },
    headerText: {
        fontSize: 20,
        marginLeft: 10
    },
    noTxnText: {
        fontSize: 20,
        paddingVertical: 10,
        alignSelf: "center"
    }
});

export const TxnListItem = ({txnData}) => {
    return (
        <Animatable.View animation="fadeInDownBig" iterationCount={1}>
            <TouchableHighlight
                onPress={()=>{console.log(txnData._id)}}
                underlayColor={"#E1E0E2"}
                style={{
                borderRadius: 10,
                backgroundColor: 'white',
                marginVertical: 5,
                marginHorizontal: 10
            }}>
                <View
                    style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    alignItems: "center"
                }}>
                    <View
                        style={{
                        alignSelf: "center",
                        marginLeft: 15,
                        borderRadius: 25,
                        backgroundColor: "#E1E0E2",
                        padding: 12,
                        borderWidth: 2,
                        borderColor: "#16235A"
                    }}>
                        <AntDesignIcon name="download" size={20} color="#16235A"/>
                    </View>
                    <Text
                        style={{
                        color: "grey",
                        fontSize: 18,
                        marginLeft: 20
                    }}>
                        {"Wallet Recharged"}
                    </Text>
                    <Text
                        style={{
                        color: "green",
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginLeft: 20
                    }}>{`+${txnData.transactionAmount} ₹`}</Text>
                </View>
            </TouchableHighlight>
        </Animatable.View>
    );
};
export const NoTxnFound = () => {
    return (
        <Animatable.View animation="fadeInDownBig" iterationCount={1}>
            <Text style={styles.noTxnText}>No Transactions Found</Text>
        </Animatable.View>
    );
};
export const TxnHeaderComponent = ({headerData}) => {
    return (
        <Animatable.View
            animation="fadeInDownBig"
            iterationCount={1}
            style={styles.header}>
            <Text style={styles.headerText}>
                {moment(headerData, "DD-MM-YYYY").calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD/MM/YYYY"
                })}
            </Text>
        </Animatable.View>
    );
};
