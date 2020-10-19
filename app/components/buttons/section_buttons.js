import React from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import AppContext from "../../state_management/app_context";

export default function SectionButtons () {
    return (
        <AppContext.Consumer>
            {({available_sections, current_section, updateCurrentSection}) =>
                <View
                    style={{
                        width:"100%",
                        flexDirection:"row",
                        height:56
                    }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {!!available_sections && available_sections.length > 0 &&  available_sections.sort((e1, e2) => e1.sortOrder - e2.sortOrder).map((section) => {
                            let is_cur = current_section == section.id;
                            let name = section["nameMainCategory"];
                            return (
                                <View
                                    style={{
                                        marginHorizontal: 10,
                                        marginVertical:9
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            borderRadius:19,
                                            minWidth:80,
                                            height: 38,
                                            paddingHorizontal:30,//is_cur ? 35 : 25,
                                            justifyContent:"center",
                                            alignItems:"center",
                                            backgroundColor:is_cur ? "rgb(155,212,137)" : "transparent"
                                        }}
                                        onPress={() => {
                                            updateCurrentSection(section.id)
                                        }}
                                    >
                                        <Text>{name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            }
        </AppContext.Consumer>
    );
}
