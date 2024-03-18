import React from 'react'
import { StyleSheet, View, ViewProps, ViewStyle, Text, TouchableOpacity, Image } from 'react-native'
import { IDiaryItemVieModel, IDiaryItemViewModelType } from '../types/ViewModels/Index'
import Feather from "react-native-vector-icons/Feather";
import { Colors } from '../styles/Index';
import { Surface } from 'react-native-paper';
import CONSTANTS from '../constants';
import { IDiaryItem, IDiaryItemType } from '../types/Models/IDiary';
import { images } from '../assets';

const TITLE_ICON_SIZE = 16;

const _DiaryItem = (itemInfo: IDiaryItem) => {

    let content;
    // console.log(`iteminfo content is: ${itemInfo.content}`);
    // console.log(`iteminfo.type is ${itemInfo.type}`);
    // console.log(`iteminfo.alert is ${IDiaryItemType.alert}`);
    if (itemInfo) {

        let subjectContent
        let purchasedContent;
        let receivedContent;
        let statusContent;
        let refNoContent;;

        let titleIconContent;
        let titleContent;
        let imageContent;
        let textContent;
        let buttonContent;

        if (itemInfo.type) {

            if (itemInfo.type == IDiaryItemType.alert.toString()) {
                titleIconContent = (
                    <View style={{ ...DiaryItemStyles.titleIconContainer, backgroundColor: Colors.RED_LIGHT }}>
                        <Feather name="alert-triangle" 
                        style={{...DiaryItemStyles.titleIcon, color:Colors.RED_BRIGHT}} 
                        size={TITLE_ICON_SIZE} />
                    </View>
                )
            }
            else {
                titleIconContent = (
                    <View style={{ ...DiaryItemStyles.titleIconContainer, backgroundColor: Colors.GREEN_LIGHT }}>
                        <Image
                            source={images.ICN_CHEF_HAT}
                            style={DiaryItemStyles.titleIcon} />
                    </View>
                )
            }
        }

        if (itemInfo.time) {
            titleContent = (
                <Text style={DiaryItemStyles.titleLabel}>{itemInfo.time}</Text>
            )
        }

        if (itemInfo.imageUrl) {
            imageContent = (
                <Image
                    source={{ uri: itemInfo.imageUrl }}
                    style={DiaryItemStyles.image} />
            )
        }

        if (itemInfo.content) {
            textContent = <Text style={DiaryItemStyles.text}>{itemInfo.content}</Text>
        }

        buttonContent = (
            <TouchableOpacity style={DiaryItemStyles.detailButton}>
                <Feather name="more-horizontal" style={DiaryItemStyles.detailButton} size={16} />
            </TouchableOpacity>
        );


        content = (
            <Surface style={itemInfo.imageUrl ? DiaryItemStyles.containerWithImage : DiaryItemStyles.containerWithoutImage} elevation={0}>
                <View style={DiaryItemStyles.titleContainer}>
                    <View style={DiaryItemStyles.titleLeftContainer}>
                        {titleIconContent}
                        {titleContent}
                    </View>
                    <View style={DiaryItemStyles.titleRightContainer}>
                        {buttonContent}
                    </View>
                </View>
                {imageContent}
                {textContent}
            </Surface>
        );
    }
    return content;
};

export default _DiaryItem;


const DiaryItemStyles = StyleSheet.create({

    containerWithImage:
    {
        paddingLeft: 12,
        paddingTop: 12,
        paddingRight: 16,
        paddingBottom: 15,
        backgroundColor: "white",
        borderColor: Colors.LINE_LIGHT,
        borderWidth: 1,
        borderRadius: 12,
        marginTop:16
    },
    containerWithoutImage:
    {
        paddingLeft: 13,
        paddingTop: 17,
        paddingRight: 16,
        paddingBottom: 15,
        backgroundColor: "white",
        borderColor: Colors.LINE_LIGHT,
        borderWidth: 1,
        borderRadius: 12,
        marginTop:16
    },
    titleContainer:
    {
        flexDirection: 'row'
    },
    titleLeftContainer:
    {
        flex: 1,
        flexDirection:"row",
        alignItems:"center"
    },
    titleRightContainer:
    {
        flex: 0.3,
        flexDirection: "row-reverse",
        alignItems:"center"
    },
    titleIconContainer:
    {
        height: 32,
        width: 32,
        alignItems: "center",
        justifyContent:"center"
    },
    titleIcon:
    {
        height: 16,
        width: 16,
        // fontSize: 16
    },
    titleLabel:
    {
        fontSize: 16,
        color: Colors.BLACK_DARK,
        fontWeight: 'bold',
        fontFamily: "open-sans",
        marginLeft: 8
    },
    detailButton:
    {
        alignItems: "center"
    },
    image:
    {
        height: 120,
        width: "100%",
        borderRadius: 8,
        marginTop: 10
    },
    text:
    {
        fontSize: 14,
        fontFamily: CONSTANTS.FONT_FAMILY,
        color: Colors.BLACK_DARK,
        marginTop: 10
    },
    infoItemContainer:
    {
        marginBottom: 7,
        flexDirection: 'row',
        fontSize: 13
    }
});