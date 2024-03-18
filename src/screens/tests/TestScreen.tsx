
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";
import { TestCardList } from "../../types/Models/Index";
import { ITestCardViewModel } from "../../types/ViewModels/Index";
import { SafeAreaView } from "react-native-safe-area-context";
import StrandsStyle from "../../styles/Styles";
import TestCard from "../../components/TestCard";



const TestScreen = ({ navigation }) => {
    const tempData = require("../../mocks.json");
    const tempDataJson = JSON.stringify(tempData);
    console.log(`tempDataJson is ${tempDataJson}`);
    const TestListResponse: TestCardList = JSON.parse(tempDataJson) as TestCardList;
    var testCardViewModelList: ITestCardViewModel[] = [];
    TestListResponse.testCards.map(item => {
        var testCardViewModel: ITestCardViewModel = {
            ...item,
            detailCallback: ShowDetailScreen
        };
        const testCardViewModelString = JSON.stringify(testCardViewModel);
        console.log(`testCardViewModel is ${testCardViewModelString}`);
        testCardViewModelList.push(testCardViewModel);
    })

    const listData = JSON.stringify(testCardViewModelList);
    console.log(`Test is ${listData}`);

    const ShowDetailScreen = (testId: string) => {
        navigation.navigate('TestDetailScreen', { testId: testId });
        return;
    }

    return (
        <SafeAreaView style={{ ...StrandsStyle.containerCenter }} edges={['left', 'right']}>
            <FlatList
                style={{ ...TestsScreenStyles.listContainer }}
                data={testCardViewModelList}
                renderItem={(item =>
                    <TestCard
                        id={item.item.id}
                        subject={item.item.subject}
                        purchaseDate={item.item.purchaseDate}
                        receivedDate={item.item.receivedDate}
                        status={item.item.status}
                        refNo={item.item.refNo}
                        detailAvailable={item.item.detailAvailable}
                        detailID={item.item.detailID}
                        detailCallback={() => ShowDetailScreen(item.item.id.toString())}></TestCard>)}>
            </FlatList>
        </SafeAreaView>
    )
}

export default TestScreen;

const TestsScreenStyles = StyleSheet.create({
    listContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10
    }
});