import React from 'react'
import { StyleSheet, View, ViewProps, ViewStyle, Text, TouchableOpacity } from 'react-native'
import { ITest, ITestCardViewModel } from '../types/ViewModels/Index'
import { Colors } from '../styles/Index';
import { Surface } from 'react-native-paper';
import CONSTANTS from '../constants';
import { Image } from '@rneui/themed';
import { images } from '../assets';

export interface ITestResultItemData {
    data:
    {
        item: ITest
    }
}

const TestResultItem = (data: ITestResultItemData) => {
    let content = (<></>);

    if (data.data.item != null && data.data.item != undefined) {
        let item = data.data.item;
        content = (
            <View style={setStyle.Container}>
                <Image source={images.IMG_TEST_TYPE} style={setStyle.Image} />
                <View style={setStyle.TextContainer}>
                    <Text style={setStyle.Date}>{item.delivered_utc?.toString()} </Text>
                    <Text style={setStyle.Type}>{item.test_type_name}</Text>
                    <Text style={setStyle.Name}>{item.customer_name}</Text>
                    <Text style={setStyle.Highlight}>Items tested: {item.result_names.length}</Text>
                </View>
            </View>
        )
    }

    return content;
}

export default TestResultItem;

const setStyle = StyleSheet.create({
    Container: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: "column",
        borderWidth: 0.7,
        borderColor: Colors.SECONDARY_BLACK
    },
    Image:
    {
        flex: 0.35,
        elevation: 4
    },
    TextContainer:
    {
        flex: 0.65,
        flexDirection: "row"
    },
    Date:
    {
        color: Colors.PRIMARY_BLUE,
        fontSize: 14,
        fontFamily: CONSTANTS.FONT_FAMILY
    },
    Type:
    {
        color: Colors.PRIMARY_BLACK,
        fontSize: 14,
        fontFamily: CONSTANTS.FONT_FAMILY
    },
    Name:
    {
        color: Colors.PRIMARY_BLACK,
        fontSize: 18,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontWeight: "bold"
    },
    Highlight:
    {
        color: Colors.PRIMARY_WHITE,
        fontSize: 12,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontWeight: "500",
        backgroundColor: Colors.PRIMARY_BLUE,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15
    }
})