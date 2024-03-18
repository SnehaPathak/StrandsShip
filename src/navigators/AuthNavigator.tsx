import React from "react";
import { Image } from "react-native";
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "../screens/login/WelcomeScreen";
import LoginScreen from "../screens/login/LoginScreen";
import { Colors } from "../styles/Index";
import { images } from "../assets";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {

    let headerOptions: StackNavigationOptions =
    {
        title: "Login",
        headerStyle: {
            backgroundColor: Colors.PRIMARY_BLUE,
            borderWidth:0,
            elevation:0,
            shadowOpacity:0
        },
        headerShadowVisible:false,
        headerBackImage: () => {
            return <Image source={images.ICN_ARROW_BACK}
                style={{ margin: 10 }}></Image>
        },
        headerTitleContainerStyle: {
            borderWidth:0,
        },
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
        headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
        }
    }

    return (
        <>
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }} />
                <AuthStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={headerOptions} />
            </AuthStack.Navigator>
        </>

    )
}

export default AuthNavigator;