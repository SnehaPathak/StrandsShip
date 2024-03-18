import React from 'react'
import { StyleSheet, View, ViewProps, ViewStyle, Text, TouchableOpacity } from 'react-native'
import { ITestCardViewModel } from '../types/ViewModels/Index'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Colors } from '../styles/Index';
// import moment from 'moment';
import { Surface } from 'react-native-paper';

const GetCardInfoRow = (label: string, value: string) => {
    return (
        <View style={TestCardStyles.TestCardInfoItemContainer}>
            <Text style={TestCardStyles.TestCardInfoItemLabel}>{label}:</Text>
            <Text style={TestCardStyles.TestCardInfoItemValue}>{value}</Text>
        </View>
    )
};

const TestCard = (cardInfo: ITestCardViewModel) => {

    let content;

    if (cardInfo) {
        let titleContent;
        let subjectContent
        let purchasedContent;
        let receivedContent;
        let statusContent;
        let refNoContent;
        let buttonContent;

        if (cardInfo.subject) {
            titleContent = (
                <View style={TestCardStyles.TestCardTitleContainer}>
                    <FontAwesome name="paste" style={TestCardStyles.TestCardTitleIcon}></FontAwesome>
                    <Text style={TestCardStyles.TestCardTitleLabel}>{cardInfo.subject}</Text>
                </View>
            );

            subjectContent = GetCardInfoRow("Subject", cardInfo.subject);
        }
        if (cardInfo.purchaseDate) {
            purchasedContent = GetCardInfoRow("Purchased", cardInfo.purchaseDate);
        }
        if (cardInfo.receivedDate && cardInfo.receivedDate != undefined)  {
            // let receivedDate = moment(cardInfo.receivedDate).format("MMM DD, YYYY");
            let dateValue = new Date(cardInfo.receivedDate);
            let receivedDate = dateValue.toDateString();
            receivedContent = GetCardInfoRow("Received", receivedDate);
        }
        if (cardInfo.status) {
            statusContent = GetCardInfoRow("Status", cardInfo.status);
        }
        if (cardInfo.refNo) {
            refNoContent = GetCardInfoRow("Ref No", cardInfo.refNo);
        }
        if (cardInfo.detailAvailable) {
            buttonContent = (
                <TouchableOpacity style={TestCardStyles.TestCardButtonContainer}
                    onPress={cardInfo.callback?.(cardInfo.id)}>
                    <Text style={TestCardStyles.TestCardButtonLabel}>View Details</Text>
                    <FontAwesome name="long-arrow-right" style={TestCardStyles.TestCardButtonIcon} />
                </TouchableOpacity>
            );
        }

        content = (
            <Surface style={TestCardStyles.TestCardContainer} elevation={3}>
                {titleContent}
                {subjectContent}
                {purchasedContent}
                {receivedContent}
                {statusContent}
                {refNoContent}
                {buttonContent}
            </Surface>
        );
    }
    return content;
};

export default TestCard;


const TestCardStyles = StyleSheet.create({

    TestCardContainer:
    {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        borderRadius: 10,
        padding: 20
    },
    TestCardTitleContainer:
    {
        paddingTop: 3,
        marginBottom: 18,
        flexDirection: 'row'
    },
    TestCardTitleIcon:
    {
        fontSize: 18,
        marginRight: 10,
        marginTop: 2,
        color: Colors.PRIMARY_BLUE,
        textAlign: 'center'
    },
    TestCardTitleLabel:
    {
        fontSize: 18,
        color: Colors.PRIMARY_BLUE,
        fontWeight: 'bold'
    },
    TestCardInfoItemContainer:
    {
        marginBottom: 7,
        flexDirection: 'row',
        fontSize: 13
    },
    TestCardInfoItemLabel:
    {
        flex: 0.3,
        color: Colors.TERTIARY_BLACK,
        textAlign: 'right'
    },
    TestCardInfoItemValue:
    {
        flex: 0.7,
        color: Colors.SECONDARY_BLACK,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10
    },
    TestCardButtonContainer:
    {
        padding: 15,
        margin: 10,
        borderRadius: 7,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.PRIMARY_BLUE
    },
    TestCardButtonLabel:
    {
        fontSize: 18,
        color: Colors.SECONDARY_WHITE
    },
    TestCardButtonIcon:
    {
        color: Colors.SECONDARY_WHITE,
        fontSize: 20,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        alignItems: 'stretch',
        marginLeft: 10,
    }
});