import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

import Styles from "../../styles/Styles";
import AppBarRightIcons from "../../components/AppBarRightIcons";

const PostListScreen = () => {
    return (
        <View style={{ ...Styles.AppStyle.containerCenterBlue }}>
            <View style={{ ...Styles.AppBarBottomNavStyle.container }}>
                <View style={setStyle.titleDropDownButton}>
                    <View style={setStyle.titleDropDownButtonContentContainer}>
                        <Text style={Styles.AppBarBottomNavStyle.label}>Community</Text>
                    </View>
                </View>
                {/* [Sneha] - spacer */}
                <View style={{ flex: 1 }} />
                <View style={setStyle.appBarRightIconsContainer}>
                    <AppBarRightIcons />
                </View>
            </View>
            <View style={Styles.AppStyle.containerBlueOverlay}></View>
        </View>
    )
}

export default PostListScreen;

const setStyle = StyleSheet.create({
    titleDropDownButton: {

    },
    titleDropDownButtonContentContainer:
    {
        flexDirection: "row",
        alignItems: "center",
    },
    appBarRightIconsContainer:
    {
        flexDirection: "row-reverse"
    },
})