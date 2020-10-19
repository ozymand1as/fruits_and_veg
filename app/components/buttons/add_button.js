import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {SimpleLineIcons, Ionicons} from "@expo/vector-icons";

const {width, height} = Dimensions.get("window");

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount:1
        }
    }

    render () {
        return (
            <View
                style={{
                    width:width,
                    flexDirection:"row",
                    paddingHorizontal:12,
                    paddingTop:8
                }}
            >
                <View
                    style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        paddingHorizontal:15,
                        width:(width-36)/3,
                        height:44,
                        borderRadius:10,
                        borderWidth:1,
                        borderColor:"#3c3c3c"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex:1,
                            justifyContent:"flex-start",
                            alignItems:"center",
                        }}
                        onPress={() => {
                            if (this.state.amount > 1) {
                                this.setState({amount:this.state.amount-1})
                            }
                        }}
                    >
                        <Ionicons name={"ios-remove"} size={30} color={this.state.amount > 1 ? "black" : "#3c3c3c60"}/>
                    </TouchableOpacity>
                    <View
                        style={{
                            flex:1,
                            justifyContent:"space-between",
                            alignItems:"center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize:16,
                            }}
                        >
                            {this.state.amount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            flex:1,
                            justifyContent:"flex-end",
                            alignItems:"center",
                        }}
                        onPress={() => {
                            this.setState({amount:this.state.amount+1})
                        }}
                    >
                        <Ionicons name={"ios-add"} size={30}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        width:(width-36)*2/3,
                        borderRadius:10,
                        marginLeft:12,
                        backgroundColor:"rgb(155,212,137)",
                        justifyContent:"center",
                        alignItems:"center"
                    }}
                    onPress={() => this.props.action(this.state.amount)}
                >
                    <Text>Добавить</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

