import React from "react";
import {ActivityIndicator, Dimensions, RefreshControl, ScrollView, Text, View} from "react-native";
import AppContext from "../../state_management/app_context";
import ProductCard from "./product_card";
import {getProductsAndCategories} from "../../methods/api";

const {width, height} = Dimensions.get("window");

export default function ProductList () {
    return (
        <AppContext.Consumer>
            {({
                  available_sections,
                  current_section,
                  product_list,
                  product_list_is_refreshing,
                  updateProductList,
                  updateAvailableSections,
                  updateCurrentSection,
                  setProductRefreshStatus,
                  setProductOverlay
            }) => {
                if (Object.keys(product_list).length > 0) {
                    return (
                        <View
                            style={{width, flex: 1, marginBottom:-80, paddingBottom:80, backgroundColor: "rgb(247,248,249)"}}
                        >
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={product_list_is_refreshing}
                                        onRefresh={() => {
                                            setProductRefreshStatus(true);
                                            getProductsAndCategories(
                                                updateProductList,
                                                updateAvailableSections,
                                                setProductRefreshStatus,
                                                updateCurrentSection
                                            )
                                        }}
                                    />
                                }
                            >
                                <Text
                                    style={{
                                        margin: 20,
                                        fontSize: 22,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {!!current_section && available_sections.find((sec) => sec.id == current_section).nameMainCategory}
                                </Text>
                                <View style={{flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 6}}>
                                    {!!product_list[current_section] && product_list[current_section].map((product) => {
                                        return (
                                            <ProductCard key={product.id} product={product} action={setProductOverlay}/>
                                        );
                                    })}
                                </View>
                                <View style={{height:160, backgroundColor:"#00000000"}}/>
                            </ScrollView>
                        </View>
                    );
                } else {
                    if (!product_list_is_refreshing) {
                        setProductRefreshStatus(true);
                        getProductsAndCategories(
                            updateProductList,
                            updateAvailableSections,
                            setProductRefreshStatus,
                            updateCurrentSection
                        );
                    }
                    return (
                        <View
                            style={{width, flex: 1, backgroundColor: "rgb(247,248,249)"}}
                        >
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={product_list_is_refreshing}
                                        onRefresh={() => {
                                            setProductRefreshStatus(true);
                                            getProductsAndCategories(
                                                updateProductList,
                                                updateAvailableSections,
                                                setProductRefreshStatus
                                            )
                                        }}
                                    />
                                }
                            >

                            </ScrollView>
                        </View>
                    );
                }
            }}
        </AppContext.Consumer>
    );
}
