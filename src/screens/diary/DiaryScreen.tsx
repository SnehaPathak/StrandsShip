import React, { useState } from "react";
import { View, FlatList, StyleSheet, Alert, Text, TouchableWithoutFeedback } from "react-native";
import { Button, Menu, FAB, Divider, ActivityIndicator } from "react-native-paper";

import Styles from "../../styles/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Article from "../../components/Article";
import { IArticle, ArticleList, IDiaryItem, DiaryItems } from "../../types/Models/Index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AppBarRightIcons from "../../components/AppBarRightIcons";
import DiaryItem from "../../components/DiaryItem";
import { CountriesModalPicker } from "../../components/RNDropdown";
import { Colors } from "../../styles/Index";
import { IFilterItem, PeriodFilterData, TypeFilterData } from "./FilterData";
import { images } from "../../assets";
import CONSTANTS, { SCREENS_IDX } from "../../constants";
import { GetCustomerNotes } from "../../helpers/AppActions";
import { IUserAccountViewModel } from "../../types/ViewModels/IUserAccountViewModel";
import AuthManager from "../../helpers/AuthManager";
import { IApiQueryResultViewModel } from "../../types/ViewModels/IApiQueryResultViewModel";
import { ICustomerNoteViewModel } from "../../types/ViewModels/ICustomerNoteViewModel";


const DiaryScreen = ({ navigation }) => {
    const countriesPickerData = [{ "key": "in", "value": "india" }, { "key": "th", "value": "thailand" }, { "key": "ar", "value": "argentina" }];
    const [countryModalVisible, setCountryModalVisible] = useState(true);
    const tempData = require("../../mocks.json");
    const tempDataJson = JSON.stringify(tempData);
    // console.log(`tempDataJson is ${tempDataJson}`);
    const DiaryItemsResponse: DiaryItems = JSON.parse(tempDataJson) as DiaryItems;
    // console.log(`DiaryItemsResponse is ${DiaryItemsResponse.diaryItems[0].type}`);

    const [selectedPeriod, setSelectedPeriod] = useState(PeriodFilterData[0])
    const [selectedType, setSelectType] = useState(TypeFilterData[0])
    const [isPeriodMenuVisible, setPeriodMenuVisible] = React.useState(false);
    const [isTypeMenuVisible, setTypeMenuVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    let listContent;

    let user: IUserAccountViewModel | null;
    const getNotes = (async () => {
        // setIsLoading(true);
        user = await AuthManager
        .GetUser()
        .finally(() => setIsLoading(false));

        let shopId = "";
        let customerId = user?.account_id;
        if (user?.shops[0].shop_id) {
            shopId = user.shops[0].shop_id;
            // customerId = user.shops[0].
        }
        const notes: IApiQueryResultViewModel<ICustomerNoteViewModel[]>
            = await GetCustomerNotes(shopId, customerId, user?.api_key, user?.api_secret);
            console.log(`${JSON.stringify(notes)}`)
        // setIsLoading(false);

        // if (notes.success) {
        //     listContent = (
        //         <FlatList
        //             data={notes.item}
        //             renderItem={(item =>
        //                 <DiaryItem
        //                     id={item.item.customer_note_id}
        //                     time={item.item.stamp_utc}
        //                     imageUrl=""
        //                     content={item.item.text}
        //                     title={item.item.author_name}
        //                     subtitle="{subtitle}"
        //                     type={item.item.note_kind}>
        //                 </DiaryItem>)}>
        //         </FlatList>
        //     )
        // }
    });
    getNotes();

    /**
     * [Sneha] - the variable name "open" here is imperative and built in.
     * If you try to change it, there will be erro
     */
    const [addButtonState, setAddButtonState] = React.useState({ open: false });
    const { open } = addButtonState;
    const onStateChange = ({ open }) => setAddButtonState({ open });


    const onMonthTapped = () => {
        Alert.alert("Month Tapped");
    }
    const selectCountry = (item) => {
        Alert.alert(`${item.key} is selected`);
    }
    const onPressCancelContryModalPicker = () => {
        setCountryModalVisible(false);
    }



    const openFilterMenu = () => setPeriodMenuVisible(true);
    const closeFilterMenu = () => setPeriodMenuVisible(false);

    const openTypeMenu = () => setTypeMenuVisible(true);
    const closeTypeMenu = () => setTypeMenuVisible(false);

    function onPeriodFilterSelected(selectedItem: IFilterItem) {
        setSelectedPeriod(selectedItem);
        closeFilterMenu();
        console.log(`selected Period is ${selectedPeriod.value}`)
        return;
    }
    function onTypeFilterSelected(selectedItem: IFilterItem) {
        setSelectType(selectedItem);
        closeTypeMenu();
        console.log(`selected Type is ${selectedType.value}`)
        return;
    }

    const onAddFoodClicked = () => {
        console.log('Pressed food')
        navigation.getParent().setParams({ type: CONSTANTS.DIARY_ITEM_FOOD })
        navigation.getParent().navigate(SCREENS_IDX.DIARY_ITEM, { type: CONSTANTS.DIARY_ITEM_FOOD });
    }
    const onAddSymptomClicked = () => {
        console.log('Pressed Symptom')
        navigation.getParent().setParams({ type: CONSTANTS.DIARY_ITEM_SYMPTOM })
        navigation.getParent().navigate(SCREENS_IDX.DIARY_ITEM, { type: CONSTANTS.DIARY_ITEM_SYMPTOM });
    }
    const onAddEnvironmentalClicked = () => {
        console.log('Pressed environment')
        navigation.setParams({ type: CONSTANTS.DIARY_ITEM_ENVIRONMENT })
        navigation.navigate(SCREENS_IDX.DIARY_ITEM, { type: CONSTANTS.DIARY_ITEM_ENVIRONMENT });
    }

    return (
        <View style={{ ...Styles.AppStyle.containerCenterBlue }}>
            <View style={{ ...Styles.AppBarBottomNavStyle.container }}>
                <View style={HomeStyle.titleDropDownButton}>
                    <TouchableWithoutFeedback onPress={onMonthTapped} >
                        <View style={HomeStyle.titleDropDownButtonContentContainer}>
                            <Text style={Styles.AppBarBottomNavStyle.label}>January</Text>
                            <FontAwesome
                                name="caret-down"
                                style={Styles.AppStyle.arrowDropDown}></FontAwesome>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/* [Sneha] - spacer */}
                <View style={{ flex: 1 }} />
                <View style={HomeStyle.appBarRightIconsContainer}>
                    <AppBarRightIcons />
                </View>
            </View>
            <View style={HomeStyle.filterButtonContainer}>
                <View style={HomeStyle.filterButtonContainerLeft}>
                    <Menu
                        visible={isPeriodMenuVisible}
                        onDismiss={closeFilterMenu}
                        contentStyle={HomeStyle.filterMenuStyle}
                        anchor={
                            <Button icon="menu-down"
                                style={HomeStyle.filterButton}
                                contentStyle={HomeStyle.filterButtonContent}
                                textColor="white"
                                onPress={openFilterMenu}>{selectedPeriod.label}</Button>
                        }>
                        {PeriodFilterData.map((item, idx) => (
                            <Menu.Item
                                key={`tab_item${idx + 1}`}
                                onPress={() => onPeriodFilterSelected(item)}
                                title={item.label}
                                titleStyle={item.value == selectedPeriod.value ? HomeStyle.filterItemSelectedStyle : HomeStyle.filterItemStyle} />
                        ))}
                    </Menu>
                    <Menu
                        visible={isTypeMenuVisible}
                        onDismiss={closeTypeMenu}
                        contentStyle={HomeStyle.filterMenuStyle}
                        anchor={
                            <Button icon="menu-down"
                                style={HomeStyle.filterButton}
                                contentStyle={HomeStyle.filterButtonContent}
                                textColor="white"
                                onPress={openTypeMenu}>{selectedType.label}</Button>
                        }>
                        {TypeFilterData.map((item, idx) => (
                            <Menu.Item
                                key={`tab_item${idx + 1}`}
                                onPress={() => onTypeFilterSelected(item)}
                                title={item.label}
                                titleStyle={item.value == selectedType.value ? HomeStyle.filterItemSelectedStyle : HomeStyle.filterItemStyle} />
                        ))}
                    </Menu>
                </View>
                <View style={HomeStyle.filterButtonContainerRight}>
                    <Button
                        style={HomeStyle.filterButtonOrange}
                        textColor="white">
                        Symptoms
                    </Button>
                </View>
            </View>
            {/* <CountriesModalPicker
                data={countriesPickerData}
                onChange={country => {
                    selectCountry(country)
                }}
                cancelText={'Cancel'}
                visible={countryModalVisible}
                onCancel={onPressCancelContryModalPicker}
            /> */}
            <View style={Styles.AppStyle.containerBlueOverlay}>
                {isLoading && <ActivityIndicator></ActivityIndicator>}
                {/* <FlatList
                data={DiaryItemsResponse.diaryItems}
                renderItem={(item =>
                    <DiaryItem
                        id={item.item.id}
                        time={item.item.time}
                        imageUrl={item.item.imageUrl}
                        content={item.item.content}
                        title={item.item.title}
                        subtitle={item.item.subtitle}
                        type={item.item.type}>
                    </DiaryItem>)}>
            </FlatList> */}
                {listContent}
                <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'calendar-today' : 'plus'}
                    fabStyle={HomeStyle.fabAddIcon}
                    style={HomeStyle.fabAddIconContainer}
                    color="white"
                    actions={[
                        {
                            icon: images.ICN_CHEF_HAT_WHITE,
                            label: 'Food',
                            color: "white",
                            style: { backgroundColor: Colors.PRIMARY_GREEN },
                            containerStyle: { backgroundColor: Colors.LINE_LIGHT },
                            labelStyle: { color: Colors.PRIMARY_GREEN },
                            onPress: onAddFoodClicked,
                        },
                        {
                            icon: 'alert-outline',
                            label: 'Symptoms',
                            color: "white",
                            style: { backgroundColor: Colors.RED_BRIGHT },
                            containerStyle: { backgroundColor: Colors.LINE_LIGHT },
                            labelStyle: { color: Colors.RED_BRIGHT },
                            onPress: onAddSymptomClicked
                        },
                        {
                            icon: images.ICN_ENVIRONMENT_WHITE,
                            label: 'Enviromental',
                            color: "white",
                            style: { backgroundColor: Colors.PRIMARY_BLUE },
                            containerStyle: { backgroundColor: Colors.LINE_LIGHT },
                            labelStyle: { color: Colors.PRIMARY_BLUE },
                            onPress: onAddEnvironmentalClicked
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />
            </View>
        </View>
    )
}

export default DiaryScreen;

const HomeStyle = StyleSheet.create({
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
    filterButtonContainer:
    {
        flexDirection: "row",
        width: "100%",
        backgroundColor: Colors.PRIMARY_BLUE,
        paddingLeft: 20,
        paddingRight: 20,
        // paddingTop: 15,
        paddingBottom: 15,
    },
    filterButtonContainerLeft:
    {
        flexDirection: "row"
    },
    filterButtonContainerRight:
    {
        flex: 1,
        flexDirection: "row-reverse"
    },
    filterButton:
    {
        borderRadius: 25,
        backgroundColor: Colors.BLUE_DARK,
        marginRight: 15
    },
    filterButtonContent:
    {
        color: "white",
        flexDirection: "row-reverse"
    },
    filterButtonOrange:
    {
        backgroundColor: Colors.ORANGE_PRIMARY
    },
    filterButtonOrangeContent:
    {
        color: "white"
    },
    fabAddIcon: {
        // position: 'absolute',
        backgroundColor: Colors.ORANGE_PRIMARY,
        color: "white",
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fabAddIconContainer:
    {
        paddingBottom: 0
    },
    filterItemStyle:
    {
        backgroundColor: Colors.PRIMARY_BLUE,
        color: "white",
        padding: 0,
        margin: 0
    },
    filterItemSelectedStyle:
    {
        backgroundColor: Colors.BLUE_DARK,
        color: "white",
        padding: 0,
        margin: 0,
        // height:"100%",
        // width:"100%"
    },
    filterMenuStyle:
    {
        backgroundColor: Colors.PRIMARY_BLUE,
        color: "white",
        padding: 0,
        margin: 0
    }
})