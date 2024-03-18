import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CONSTANTS from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarApp from "../../components/StatusBarApp";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { StatusBar } from "react-native";

const DiaryItemAddScreen = ({ navigation, route }) => {
    const itemType = route.params.type;

    return (
        <View style={{backgroundColor:Colors.PRIMARY_BLUE, flex:1}}>
        <StatusBar backgroundColor={Colors.PRIMARY_BLUE} barStyle="dark-content" />
        <SafeAreaView>
            
            <Text>{itemType}</Text>
            <Button title="BACK" onPress={() => navigation.goBack()}></Button>
        </SafeAreaView>
        </View>
    )
}

export default DiaryItemAddScreen;