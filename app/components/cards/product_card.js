import React from "react";
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";

const {width, height} = Dimensions.get("window");

export default function ProductCard({product, action}) {
    return (
        <TouchableOpacity
            style={{
                borderRadius:20,
                margin:7,
                width:(width-40)/2,
                height:(width-40)*0.8,
                backgroundColor:"white"
            }}
            onPress={() => action(product)}
        >
            {!!product.urlPic
                ?
                <Image
                    style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        width: (width - 40) / 2,
                        height: (width - 40) / 2,
                    }}
                    source={{uri: product.urlPic}}
                />
                :
                <View
                    style={{
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        width: (width - 40) / 2,
                        height: (width - 40) / 2,
                    }}
                />
            }
            <Text style={{marginLeft:8, marginTop:10, fontSize:15}}>{product.name}</Text>
            <View style={{
                position:"absolute",
                bottom:16,
                left:8,
                right:8,
                flexDirection:"row",
                justifyContent:"space-between"
            }}>
                <Text>{product.price + " ₽/" + (product.unit == 1 ? "шт." : "кг")}</Text>
                <Text>{product.amount}</Text>
            </View>
        </TouchableOpacity>
    );
}
