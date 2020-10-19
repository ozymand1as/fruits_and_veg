import React from "react";
import {Text, View} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {CustomHeader} from "../headers_footers/custom_header";
import {SimpleLineIcons, Ionicons} from "@expo/vector-icons";
import SectionButtons from "../buttons/section_buttons";
import ProductList from "../cards/product_list";
import ProductOverlay from "../cards/product_overlay";
import ToCart from "../buttons/to_cart";

export class MainScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flex:1, width:"100%", alignItems:"center", justifyContent:"space-between"}}>
                    <View style={{height:106}}>
                        <CustomHeader
                            label="Магазин"
                            //left_el={<Ionicons name={"ios-close"} size={32} color={"black"}/>}
                            right_el={<Ionicons name={"ios-information-circle-outline"} size={28} color={"black"}/>}
                        />
                        <SectionButtons/>
                    </View>

                    <ProductList/>

                    {/*<View />*/}

                    <ToCart navigation={this.props.navigation}/>

                    <ProductOverlay />
                </View>
            </SafeAreaView>
        );
    }
}