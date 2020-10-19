import React from "react";
import {Animated, Dimensions, Image, Modal, Text, TouchableOpacity, View} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AppContext from "../../state_management/app_context";
import AddButton from "../buttons/add_button";
import BigBottomButton from "../buttons/big_bottom_button";

const {width, height} = Dimensions.get("window");

export default function DeliveryTimeOverlay () {
    return (
        <AppContext.Consumer>
            {({delivery_address, updateDeliveryAddress, time_overlay, time_overlay_opacity, setTimeOverlay}) =>
                <Animated.View
                    pointerEvents={"box-none"}
                    style={{
                        position: "absolute",
                        top: -50,
                        bottom: -50,
                        left: 0,
                        right: 0,
                        backgroundColor:"#000", opacity:time_overlay_opacity
                    }}
                >
                    {Platform.OS == "android"
                        ?
                            (!!time_overlay
                            ?
                            <DateTimePicker
                                value={!!delivery_address.dtDelivery  ? delivery_address.dtDelivery  : new Date()}
                                mode={"time"}
                                is24Hour={true}
                                display="default"
                                onChange={(event, date) => {
                                    console.log("selected date", date);
                                    updateDeliveryAddress("dtDelivery", date);
                                    setTimeOverlay(null);
                                }}
                            />
                            :
                            null)
                        :
                        <Modal
                            animationType={"slide"}
                            transparent
                            visible={!!time_overlay}
                        >
                            {!!time_overlay &&
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
                                    onPress={() => setTimeOverlay(false)}
                                />
                                <View
                                    style={{
                                        width: width, height: width * 0.9,
                                        backgroundColor: "white",
                                        borderTopLeftRadius: 20,
                                        borderTopRightRadius: 20,
                                        paddingVertical: 20,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <DateTimePicker
                                        minimumDate={new Date()}
                                        value={!!delivery_address.dtDelivery ? delivery_address.dtDelivery : new Date()}
                                        mode={"datetime"}
                                        is24Hour={true}
                                        display="default"
                                        onChange={(event, date) => {
                                            console.log("selected date", date);
                                            updateDeliveryAddress("dtDelivery", date);
                                        }}
                                    />

                                    <View>
                                        <BigBottomButton
                                            mid_l={"Выбрать"}
                                            action={
                                                (amount) => {
                                                    //updateCart({...cart_items, [time_overlay.id]:amount});
                                                    setTimeOverlay(null);
                                                }
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                            }
                        </Modal>
                    }
                </Animated.View>
            }
        </AppContext.Consumer>
    );
}