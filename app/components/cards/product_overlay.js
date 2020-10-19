import React from "react";
import {Animated, Dimensions, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import AppContext from "../../state_management/app_context";
import AddButton from "../buttons/add_button";

const {width, height} = Dimensions.get("window");

export default function ProductOverlay () {
    return (
        <AppContext.Consumer>
            {({product_overlay, overlay_opacity, cart_items, updateCart, setProductOverlay}) =>
                <Animated.View
                    pointerEvents={"box-none"}
                    style={{
                        position: "absolute",
                        top: -50,
                        bottom: -50,
                        left: 0,
                        right: 0,
                        backgroundColor:"#000", opacity:overlay_opacity
                    }}
                >
                    <Modal
                        animationType={"slide"}
                        transparent
                        visible={!!product_overlay}
                        //onDismiss={() => setProductOverlay(null)}
                    >
                        {!!product_overlay &&
                            <View
                                style={{
                                    width: width,
                                    flex: 1,
                                    justifyContent: "flex-end"
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: 0, bottom: 0,
                                        left: 0, right: 0
                                    }}
                                    onPress={() => setProductOverlay(null)}
                                />
                                <View
                                    style={{
                                        width: width, height: width*1.2,
                                        backgroundColor: "white",
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                    }}
                                >
                                    {!!product_overlay.urlPic
                                        ?
                                        <Image
                                            style={{
                                                width: width, height: width*2/3,
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                            }}
                                            source={{uri: product_overlay.urlPic}}
                                        />
                                        :
                                        <View
                                            style={{
                                                width: width, height: width*2/3,
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                            }}
                                        />
                                    }
                                    <View
                                        style={{
                                            minHeight:60,
                                            paddingHorizontal:12,
                                            paddingVertical:14,
                                            borderBottomWidth:1,
                                            borderColor:"#3030300f",
                                            textAlign:"center"
                                        }}
                                    >
                                        <Text style={{color:"#3c3c3cb0"}}>{product_overlay.description}</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection:"row",
                                            justifyContent:"space-between",
                                            paddingHorizontal:12,
                                            paddingVertical:12,
                                        }}
                                    >
                                        <View style={{flexDirection:"row", flex:5}}>
                                            <Text style={{marginRight:16}}>{product_overlay.name}</Text>
                                            <Text style={{color:"#3c3c3cb0"}}>{product_overlay.amount}</Text>
                                        </View>
                                        <View style={{flex:1, alignItems:"flex-end"}}>
                                            <Text>{product_overlay.price + " ₽/" + (product_overlay.unit == 1 ? "шт." : "кг")}</Text>
                                        </View>
                                    </View>

                                    <AddButton
                                        unit={product_overlay.unit}
                                        action={
                                            (amount) => {
                                                updateCart(
                                                    {
                                                        ...cart_items,
                                                        [product_overlay.id]:(
                                                            !!cart_items[product_overlay.id]
                                                                ? cart_items[product_overlay.id] + amount
                                                                : amount
                                                        )
                                                    }
                                                );
                                                setProductOverlay(null);
                                            }
                                        }
                                    />
                                </View>
                            </View>
                        }
                    </Modal>
                </Animated.View>
            }
        </AppContext.Consumer>
    );
}
