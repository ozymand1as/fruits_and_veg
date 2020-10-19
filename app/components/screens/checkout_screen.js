import React from "react";
import {ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from "../../state_management/app_context";
import {CustomHeader} from "../headers_footers/custom_header";
import {Ionicons} from "@expo/vector-icons";
import {CartContents} from "../cards/cart_contents";
import BigBottomButton from "../buttons/big_bottom_button";
import {FullWidthInput} from "../fields/full_width_input";
import {PartialInput} from "../fields/partial_input";
import {postOrder} from "../../methods/api";
import DeliveryTimeOverlay from "../cards/delivery_time_overlay.ios";
import {DeliveryTimeInput} from "../fields/delivery_time_input";
import DateTimePicker from "@react-native-community/datetimepicker";

export function CheckoutScreen ({navigation}) {
    return (
        <SafeAreaView>
            <AppContext.Consumer>
                {({
                    cart_items,
                    product_list,
                    updateCart,
                    delivery_address,
                    setTimeOverlay,
                    updateDeliveryAddress,
                    phone,
                    updatePhone,
                    waiting_for_reply,
                    updateWaitState,
                    time_overlay
                }) => {
                    return(
                        <View
                            style={{
                                backgroundColor:"rgb(247,248,249)", height:"100%"
                            }}
                        >
                            <CustomHeader
                                label="Оформление заказа"
                                left_el={
                                    <TouchableOpacity
                                        onPress={() => navigation.goBack()}
                                    >
                                        <Ionicons name={"ios-arrow-back"} size={32} color={"black"}/>
                                    </TouchableOpacity>
                                }
                                /*right_el={
                                    <TouchableOpacity
                                        onPress={() => updateCart({})}
                                    >
                                        <Ionicons name={"ios-trash"} size={32} color={"black"}/>
                                    </TouchableOpacity>
                                }*/
                            />

                            <ScrollView
                                scrollEnabled={false}
                                keyboardShouldPersistTaps={"never"}
                                style={{backgroundColor:"rgb(247,248,249)"}}
                            >

                                <Text
                                    style={{
                                        margin:20,
                                        fontSize:22,
                                        fontWeight:"bold"
                                    }}
                                >
                                    Доставка
                                </Text>

                                <FullWidthInput
                                    required
                                    label={"Телефон"}
                                    mask={"+9 999 999 99 99"}
                                    value={delivery_address.phone}
                                    v_key={"phone"}
                                    updateFunction={updateDeliveryAddress}
                                />

                                <FullWidthInput
                                    label={"Адрес"}
                                    value={delivery_address.address}
                                    updateFunction={updateDeliveryAddress}
                                    v_key={"address"}
                                />

                                <View
                                    style={{
                                        flexDirection:"row",
                                        paddingHorizontal:10
                                    }}
                                >
                                    <PartialInput
                                        label={"Подъезд"}
                                        mask={"9999"}
                                        value={delivery_address.entrance}
                                        updateFunction={updateDeliveryAddress}
                                        v_key={"entrance"}
                                    />
                                    <PartialInput
                                        mask={"9999"}
                                        label={"Этаж"}
                                        value={delivery_address.floor}
                                        updateFunction={updateDeliveryAddress}
                                        v_key={"floor"}
                                    />
                                    <PartialInput
                                        mask={"9999"}
                                        label={"Кв."}
                                        value={delivery_address.flat}
                                        updateFunction={updateDeliveryAddress}
                                        v_key={"flat"}
                                    />
                                </View>

                                <DeliveryTimeInput
                                    label={"Время доставки"}
                                    value={delivery_address.dtDelivery}
                                    interactFunction={setTimeOverlay}
                                    updateDeliveryAddress={updateDeliveryAddress}
                                />

                                <Text
                                    style={{
                                        margin:20,
                                        fontSize:22,
                                        fontWeight:"bold"
                                    }}
                                >
                                    Оплата
                                </Text>

                                {/*Выбор способа оплаты*/}

                                <View
                                    style={{
                                        flexDirection:"row",
                                        paddingHorizontal:28,
                                        alignItems:"center"
                                    }}
                                >
                                    <Ionicons size={20} name={"ios-checkbox"} />
                                    <Text style={{marginLeft:12, fontSize:15, marginBottom:3}}>Наличными курьеру</Text>
                                </View>
                            </ScrollView>

                            {!!waiting_for_reply
                                ?
                                    <BigBottomButton
                                        mid_elem={<ActivityIndicator size="large"/>}
                                    />
                                :
                                    <BigBottomButton
                                        action={() => {
                                            if (!delivery_address["phone"] || (!!delivery_address["phone"] && delivery_address["phone"].length != 16)) {
                                                Alert.alert("Внимание!", "Введите корректный номер телефона");
                                                return;
                                            }

                                            updateWaitState(true);
                                            let all_products = Object.values(product_list).reduce((acc, cur) => [...acc, ...cur], [])
                                            console.log(cart_items, product_list, all_products);
                                            let prod_arr = Object.keys(cart_items).map((k) => {
                                                let idPrice = all_products.find((el) => el.id == k).idPrice
                                                return ({
                                                    id:parseInt(k),
                                                    amount:cart_items[k],
                                                    idPrice
                                                })
                                            })
                                            postOrder(
                                                {
                                                    ...delivery_address,
                                                    products:prod_arr,
                                                    dtDelievery: (!!delivery_address["delivery_address"] ? delivery_address["delivery_address"] : new Date()),
                                                    phone:delivery_address["phone"].replace(/\+|\s/g, "")
                                                }).then((res) => {
                                                    //alert(Object.keys(delivery_address));
                                                    //alert(res);
                                                    Alert.alert("Успех!", "Ваш заказ принят, скоро с Вами свяжутся!")
                                                    updateWaitState(false);
                                                    updateCart({});
                                                    navigation.navigate("Main");
                                                })
                                                .catch((err) => {
                                                    //alert(err);
                                                    Alert.alert("Внимание", "При обработке заказа возникла ошибка: "+JSON.stringify(err));
                                                    updateWaitState(false);
                                                })
                                            /*setTimeout(() => {
                                                //Alert.alert("Заказ принят!", "Скоро с Вами свяжется наш менеджер!");
                                                //alert(Object.keys(delivery_address));
                                                console.log(delivery_address);
                                                updateWaitState(false);
                                                updateCart({});
                                                navigation.navigate("Main");
                                            }, 1000)*/
                                        }}
                                        mid_l={"Заказать"}
                                    />
                            }

                            <DeliveryTimeOverlay />
                        </View>
                    );
                }}
            </AppContext.Consumer>
        </SafeAreaView>
    );
}