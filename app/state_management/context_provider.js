import React from "react";
import AppContext from "./app_context";
import {Animated} from "react-native";

export default class ContextProvider extends React.Component {
    state = {
        app_ready:false,

        //products
        product_list: [],
        product_list_is_refreshing: false,

        //sections on the main screen
        available_sections: [],
        current_section: 0,

        //cart
        cart_items:{},

        //delivery
        delivery_address:{},
        phone:"",
        waiting_for_reply:false,

        //product overlay
        product_overlay:null,
        overlay_opacity:new Animated.Value(0),

        //delivery time overlay
        time_overlay:null,
        time_overlay_opacity:new Animated.Value(0),

    }

    render () {
        return (
            <AppContext.Provider
                value = {{
                    ...this.state,
                    //products
                    updateProductList: new_list => {this.setState({product_list:new_list})},
                    setProductRefreshStatus: status => {this.setState({product_list_is_refreshing:status})},
                    //sections
                    updateAvailableSections: new_sections => {this.setState({available_sections:new_sections})},
                    updateCurrentSection: cur_sec => {this.setState({current_section:cur_sec})},
                    //cart
                    updateCart: new_cart => {this.setState({cart_items:new_cart})},
                    //delivery
                    updateDeliveryAddress: (key, value) => {
                        this.setState({delivery_address:{...this.state.delivery_address, [key]:value}})
                    },
                    updatePhone: new_phone => {this.setState({phone:new_phone})},
                    updateWaitState: new_state => {this.setState({waiting_for_reply:new_state})},

                    //product overlay
                    setProductOverlay: val => {
                        Animated.timing(
                            this.state.overlay_opacity,
                            {
                                toValue:!!val ? 0.4 : 0,
                                duration:300
                            }
                        ).start()
                        this.setState({product_overlay:val})
                    },

                    //time overlay
                    setTimeOverlay: val => {
                        Animated.timing(
                            this.state.time_overlay_opacity,
                            {
                                toValue:!!val ? 0.4 : 0,
                                duration:300
                            }
                        ).start()
                        this.setState({time_overlay:val})
                    }
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}