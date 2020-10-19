import React from "react";
import {Text, View} from "react-native";

export class CustomHeader extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={{flexDirection:"row", width:"100%"}}>
                <View
                    style={{
                        backgroundColor:"white",
                        flexDirection:"row",
                        flex:1,
                        //paddingHorizontal:12,
                        alignItems:"center",
                        justifyContent:"space-between",
                        height:this.props.height || 50
                    }}
                >
                    <View style={{width:50, alignItems:"center", justifyContent:"center"}}>
                        {!!this.props.left_el
                            ?
                                this.props.left_el
                            :
                                <View></View>
                        }
                    </View>

                    {!!this.props.label
                        ?
                            <Text style={{fontSize:18}}>{this.props.label}</Text>
                        :
                            <View></View>
                    }

                    <View style={{width:50, alignItems:"center", justifyContent:"center"}}>
                        {!!this.props.right_el
                            ?
                                this.props.right_el
                            :
                                <View></View>
                        }
                    </View>
                </View>
            </View>
        );
    }
}