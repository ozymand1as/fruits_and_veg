import React from "react";
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import AppContext from "../../state_management/app_context";
import {Ionicons} from "@expo/vector-icons";

const {width, height} = Dimensions.get("window");

export function CartContents () {
    return(
        <AppContext.Consumer>
            {({cart_items, product_list, updateCart}) => {
                return(
                    <View
                        style={{width, backgroundColor:"white", marginTop:4}}
                    >
                        {Object.keys(cart_items).map((key) => {
                            let product = null;
                            Object.values(product_list).forEach((category) => {
                                category.forEach((cur_product) => {
                                    if (cur_product.id == key) {
                                        product = {...cur_product}
                                    }
                                })
                            })
                            console.log(product);
                            return (
                                <View style={{height:40, paddingLeft:30,  width, alignItems:"center", flexDirection:"row"}}>
                                    <Text>{cart_items[key]}</Text>
                                    <Ionicons style={{marginHorizontal:8, marginTop:2}} name={"ios-close"} size={18} color={"#3c3c3cb0"}/>
                                    <Text>{product.name}</Text>
                                    <Text
                                        style={{position:"absolute", right:40}}
                                    >
                                        {product.price*cart_items[key] + " ₽"}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            height:40, width:40, justifyContent:"center", alignItems:"center",
                                            position:"absolute", right:0
                                        }}
                                        onPress={() => {
                                            let upd_cart = {...cart_items}
                                            delete upd_cart[key]
                                            updateCart(upd_cart);
                                        }}
                                    >
                                        <Ionicons style={{marginTop:2}} name={"ios-close"} size={26} color={"red"}/>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                );
            }}
        </AppContext.Consumer>
    );
}
