import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TestScreen from "./TestScreen";
import TestDetailScreen from "./TestDetailScreen";

const TestStackProvider = createNativeStackNavigator();

const TestNavigationScreen = () => {
    return (
        <TestStackProvider.Navigator>
            <TestStackProvider.Screen name="Test" component={TestScreen}></TestStackProvider.Screen>
            <TestStackProvider.Screen name="Test Details" component={TestDetailScreen}></TestStackProvider.Screen>
        </TestStackProvider.Navigator>
        );
}

export default TestNavigationScreen;