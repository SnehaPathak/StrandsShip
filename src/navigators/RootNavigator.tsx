import React from "react";
import { View, Text, ScrollView } from 'react-native';
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useUser } from "@realm/react";
import { NavigationContainer } from "@react-navigation/native";

import HomeNavigator from "./HomeNavigator";
import AuthNavigator from "./AuthNavigator";
import DiaryItemAddScreen from "../screens/diary/DiaryItemAddScren";
import { SCREENS_IDX } from "../constants";

const RootStack = createStackNavigator();

const App = () => {
    // const user = useUser();
    // console.log(`user data is ${JSON.stringify(user)}`)
    return (
        <PaperProvider>
            {/* <View style={{backgroundColor:"yellow"}}></View> */}
            {/* <MainBottomTabNavigation></MainBottomTabNavigation> */}
            {/* <MyComponent/> */}
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{ headerShown: false, animationEnabled: false }}
                    initialRouteName={SCREENS_IDX.AUTH_NAV}>
                    <RootStack.Screen name={SCREENS_IDX.AUTH_NAV} component={AuthNavigator} />
                    <RootStack.Screen name={SCREENS_IDX.HOME_NAV} component={HomeNavigator} />
                    <RootStack.Screen name={SCREENS_IDX.DIARY_ITEM} component={DiaryItemAddScreen}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;