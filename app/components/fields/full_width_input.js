import React from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import { TextInputMask } from 'react-native-masked-text'

export function FullWidthInput ({label, updateFunction, mask, value, v_key, required}) {
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
                {!!required && <Text style={{color:"red"}}> *</Text>}
            </Text>
            {!!mask
                ?
                    <TextInputMask
                        type={"custom"}
                        options={{
                            mask:mask
                        }}
                        value={value}
                        onChangeText={(val) => {
                            if (!!v_key) {
                                updateFunction(v_key, val)
                            } else {
                                updateFunction(val)
                            }
                        }}
                        style={{
                            width:"100%",
                            borderBottomWidth:1,
                            borderColor:"#3c3c3c64",
                            paddingHorizontal:4,
                            paddingVertical:5,
                            height:30
                        }}
                    />
                :
                    <TextInput
                        style={{
                            width:"100%",
                            borderBottomWidth:1,
                            borderColor:"#3c3c3c64",
                            paddingHorizontal:4,
                            paddingVertical:5,
                            height:30
                        }}
                        value={value}
                        onChangeText={(val) => {
                            if (!!v_key) {
                                updateFunction(v_key, val)
                            } else {
                                updateFunction(val)
                            }
                        }}
                    />
            }
        </View>
    );
}