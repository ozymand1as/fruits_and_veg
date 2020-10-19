import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from "../../state_management/app_context";
import {CustomHeader} from "../headers_footers/custom_header";
import {Ionicons} from "@expo/vector-icons";
import {CartContents} from "../cards/cart_contents";
import BigBottomButton from "../buttons/big_bottom_button";

export function CartScreen ({navigation}) {
    return (
        <SafeAreaView>
            <AppContext.Consumer>
                {({cart_items, product_list, updateCart}) => {
                    return(
                        <View style={{backgroundColor:"rgb(247,248,249)", height:"100%"}}>
                            <CustomHeader
                                label="Корзина"
                                left_el={
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                    >
                                        <Ionicons name={"ios-arrow-back"} size={32} color={"black"}/>
                                    </TouchableOpacity>
                                }
                                right_el={
                                    <TouchableOpacity
                                        onPress={() => updateCart({})}
                                    >
                                        <Ionicons name={"ios-trash"} size={32} color={"black"}/>
                                    </TouchableOpacity>
                                }
                            />

                            <CartContents />

                            {Object.values(cart_items).length > 0 &&
                                <BigBottomButton
                                    action={() => {
                                        navigation.navigate("Checkout");
                                    }}
                                    mid_l={"Перейти к оформлению"}
                                    //right_l={Object.values(cart_items).reduce((acc, cur) => acc+cur, 0) + " тов."}
                                />
                            }
                        </View>
                    );
                }}
            </AppContext.Consumer>
        </SafeAreaView>
    );
}