import React from "react";
import {Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "../../methods/moment-with-locales";


export function DeliveryTimeInput ({label, interactFunction, value, updateDeliveryAddress}) {
    moment.locale("ru");
    let ru_value = moment(value).calendar();//.format("MMMM Do, h:mm:ss a");
    return (
        <View
            style={{
                flexDirection:"column",
                //flex:1,
                paddingHorizontal:20,
                paddingVertical:8
            }}
        >
            <Text
                style={{
                    color:"#3c3c3c64",
                    fontSize:12
                }}
            >
                {label}
            </Text>
            <TouchableOpacity
                style={{
                    width:"100%",
                    borderBottomWidth:1,
                    borderColor:"#3c3c3c64",
                    paddingHorizontal:4,
                    paddingVertical:5,
                    height:30
                }}
                onPress={() => interactFunction(true)}
            >
                <Text>{ru_value}</Text>
            </TouchableOpacity>
        </View>
    );
}