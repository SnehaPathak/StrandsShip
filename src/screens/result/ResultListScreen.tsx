import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import Styles from "../../styles/Styles";
import AppBarRightIcons from "../../components/AppBarRightIcons";
import { IUserAccountViewModel } from "../../types/ViewModels/IUserAccountViewModel";
import { ITest } from "../../types/ViewModels/Index";
import { IApiQueryResultViewModel } from "../../types/ViewModels/IApiQueryResultViewModel";
import { GetTests } from "../../helpers/AppActions";
import TestResultItem from "../../components/TestResultItem";
import { ActivityIndicator } from "react-native-paper";
import AuthManager from "../../helpers/AuthManager";
import { useFocusEffect } from "@react-navigation/native";

const ResultListScreen = ({ navigation, route }) => {


    const [isLoading, setIsLoading] = React.useState(false);
    const [fetchedData, setFetchedData] = React.useState(false);
    // const [user, setUser] = React.useState<IUserAccountViewModel | null>(null);

    let listContent;
    console.log(`result list screen`)
    console.log(`navigation from ResultListScreen is ${JSON.stringify(navigation)}`)
    console.log(`route from ResultListScreen is ${JSON.stringify(route)}`)


    let tests: IApiQueryResultViewModel<ITest[]> = {} as IApiQueryResultViewModel<ITest[]>;
    let user: IUserAccountViewModel | null;
    const getData = useCallback(async () => {

        user = await AuthManager
            .GetUser()
            // .then(data => { console.log(`user is ${JSON.stringify(data)}`) })
            .finally(() => setIsLoading(false));

            console.log(`user is ${JSON.stringify(user)}`);
        let shopId = "";
        let customerId = user?.account_id;
        if (user?.shops[0].shop_id) {
            shopId = user.shops[0].shop_id;
        }
        tests
            = await GetTests(shopId, customerId, user?.api_key, user?.api_secret)
                .finally(() => setIsLoading(false));
        console.log(`${JSON.stringify(tests)}`)
        // console.log(`date now  is ${Date.now()}`)
        // setIsLoading(false);

        if (tests.success) {
            listContent = (
                <FlatList
                    data={tests.item}
                    renderItem={(item =>
                        <TestResultItem
                            data={item}>
                        </TestResultItem>)}>
                </FlatList>
            )
        }
    }, [user]);

    getData();


    return (
        <View style={{ ...Styles.AppStyle.containerCenterBlue }}>
            <View style={{ ...Styles.AppBarBottomNavStyle.container }}>
                <View style={setStyle.titleDropDownButton}>
                    <View style={setStyle.titleDropDownButtonContentContainer}>
                        <Text style={Styles.AppBarBottomNavStyle.label}>Results</Text>
                    </View>
                </View>
                {/* [Sneha] - spacer */}
                <View style={{ flex: 1 }} />
                <View style={setStyle.appBarRightIconsContainer}>
                    <AppBarRightIcons />
                </View>
            </View>
            <View style={Styles.AppStyle.containerBlueOverlay}>
                {/* {isLoading && <ActivityIndicator></ActivityIndicator>} */}
                {/* {listContent} */}
                <FlatList
                    data={tests.item}
                    onRefresh={getData}
                    refreshing={isLoading}
                    renderItem={(item =>
                        <TestResultItem
                            data={item}>
                        </TestResultItem>)}>
                </FlatList>
            </View>
        </View>
    )
}

export default ResultListScreen;

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