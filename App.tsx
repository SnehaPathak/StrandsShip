import React from "react";
import { View, Text, ScrollView } from 'react-native';
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useUser } from "@realm/react";
import { NavigationContainer } from "@react-navigation/native";

import HomeNavigator from "./src/navigators/HomeNavigator";
import DiaryItemAddScreen from "./src/screens/diary/DiaryItemAddScren";
import MyComponent from "./src/navigators/_MaterialTabNavigation";
import StatusBarApp from "./src/components/StatusBarApp";
import { Styles, Colors } from "./src/styles";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { SCREENS_IDX} from "./src/constants";
import screens from "./src/screens/Index";
import { AuthProvider } from "./src/hooks/useAuth";
import AuthManager from "./src/helpers/AuthManager";

const RootStack = createStackNavigator();

const App = () => {
    // const user = useUser();
    // console.log(`user data is ${JSON.stringify(user)}`)
    return (
        <PaperProvider>
            {/* <AuthProvider authManager={AuthManager}> */}
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{ headerShown: false, animationEnabled: false }}
                    initialRouteName={SCREENS_IDX.AUTH_NAV}>
                    <RootStack.Screen name={SCREENS_IDX.AUTH_NAV} component={AuthNavigator} />
                    <RootStack.Screen name={SCREENS_IDX.HOME_NAV} component={HomeNavigator} />
                    <RootStack.Screen name={SCREENS_IDX.DIARY_ITEM} component={DiaryItemAddScreen}/>
                </RootStack.Navigator>
            </NavigationContainer>
            {/* </AuthProvider> */}
        </PaperProvider>
    );
}

export default App;