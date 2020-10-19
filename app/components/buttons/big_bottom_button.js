import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export default function BigBottomButton ({action, left_l, mid_l, mid_elem, right_l}) {
    return (
        <View
            style={{
                height:130,
                position:"absolute",
                bottom:-50, left:0, right:0,
                padding:10,
                paddingBottom:60,
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"flex-start",
                backgroundColor:"white",
                borderTopWidth:1,
                borderColor:"#3c3c3c0f"
            }}
        >
            <TouchableOpacity
                style={{
                    flex:1,height:44,
                    flexDirection:"row",
                    backgroundColor:"rgb(155,212,137)",
                    borderRadius:10,
                    justifyContent:"space-between",
                    alignItems:"center",
                    paddingHorizontal:20
                }}
                onPress={() => {
                    if (!!action) action();
                }}
            >
                <View
                    style={{
                        flex:1,
                        flexDirection:"row",
                        justifyContent:"space-between"
                    }}
                >
                    <View
                        style={{
                            width:"20%",
                            alignItems:"flex-start"
                        }}
                    >
                        {!!left_l && <Text>{left_l}</Text>}
                    </View>
                    <View
                        style={{
                            width:"60%",
                            alignItems:"center"
                        }}
                    >
                        {!!mid_l && <Text style={{fontWeight:"bold"}}>{mid_l}</Text>}
                        {!!mid_elem && mid_elem}
                    </View>
                    <View
                        style={{
                            width:"20%",
                            alignItems:"flex-end"
                        }}
                    >
                        {!!right_l && <Text>{right_l}</Text>}
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
}