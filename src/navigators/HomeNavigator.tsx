import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { View, Text, ScrollView, Image, ImageBackground, StyleSheet, Platform } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TabNavigationData from "./TabNavigationData";
import StrandsColors from "../styles/Colors";
import { IMainBottomTabNavigation, IUserAccountViewModel } from "../types/ViewModels/Index";
import StatusBarApp from "../components/StatusBarApp";
import { Colors } from "../styles/Index";
import AuthManager from "../helpers/AuthManager";

const FooterTabs = createMaterialBottomTabNavigator();

const HomeNavigator = ({navigation, route}) => {

    // let user: IUserAccountViewModel | null;
    // const getUser = (async () => {
    //     // setIsLoading(true);
    //     user = await AuthManager
    //     .GetUser()
    //     .then((data)=> console.log(`home navigator - user is ${JSON.stringify(data)}`))
    //     .finally(()=> console.log(`user from HomeNavigator is ${JSON.stringify(user)}`))
    //     console.log(`user from HomeNavigator is ${JSON.stringify(user)}`)
    // })
    // getUser();


    const getTabIcon = (tabNavigationDataItem: IMainBottomTabNavigation, focused: boolean): React.ReactElement => {
        let content;

        if (tabNavigationDataItem.isVectorIcon) {
            content = (<MaterialIcons
                name={tabNavigationDataItem.iconFocusedGlyph || ""}
                color="white"
                size={23}
                style={[tabNavigationDataItem && styles.tabBarIconFocused]} />);
        }
        else {
            content = (<Image source={focused ? tabNavigationDataItem.iconFocused : tabNavigationDataItem.iconUnFocused} />);
        }
        return (
            <View style={styles.tabBarItemContainer}>
                {content}
            </View>);
    }

    return (
        // <NavigationContainer>
        <>
            <StatusBarApp backgroundColor={Colors.PRIMARY_BLUE} barStyle="light-content" />
            <FooterTabs.Navigator
                activeColor={StrandsColors.GREEN_DARK}
                inactiveColor={StrandsColors.GREY_LIGHT}
                activeIndicatorStyle={[styles.activeTabStyle]}
                barStyle={styles.tabBarStyle}
                
                theme={{ colors: { surfaceVariant: 'red', surface: "blue" } }}>
                {TabNavigationData.map((item, idx) => (
                    <FooterTabs.Screen
                        key={`tab_item${idx + 1}`}
                        name={item.name}
                        component={item.component}
                        options={{
                            tabBarIcon: ({ focused }) => getTabIcon(item, focused),
                            tabBarLabel: item.name
                        }}
                        // initialParams={{'user': user}}
                    />
                ))}

            </FooterTabs.Navigator>
            </>
        // </NavigationContainer>
       
    );
}

export default HomeNavigator;

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: "transparent"
    },
    tabBarItemContainer: {
        bottom: Platform.OS === 'ios' ? -2 : 0
    },
    tabBarStyle: {
        backgroundColor: 'white',
        shadowOpacity:11.5,
    },
    tabBarIconFocused: {
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})