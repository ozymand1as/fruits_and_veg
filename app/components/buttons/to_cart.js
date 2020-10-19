import React from "react";
import BigBottomButton from "./big_bottom_button";
import AppContext from "../../state_management/app_context";


export default function ToCart ({navigation}) {
    return (
        <AppContext.Consumer>
            {({cart_items}) => {
                if (!!cart_items && Object.values(cart_items).length > 0) {
                    return (
                        <BigBottomButton
                            action={() => {
                                navigation.navigate("Cart");
                            }}
                            mid_l={"Корзина"}
                            //right_l={Object.values(cart_items).reduce((acc, cur) => acc+cur, 0) + " тов."}
                            right_l={Object.keys(cart_items).length + " тов."}
                        />
                    );
                } else {
                    return null;
                }
            }}
        </AppContext.Consumer>
    );
}