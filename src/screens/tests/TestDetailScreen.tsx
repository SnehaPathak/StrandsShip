import React from "react";
import { Text } from "react-native";

const TestDetailScreen = ({ navigation, route }) => {

    return (<>
    <Text>Test Detail</Text>
    <Text>`Test id is ${route.params.id}`</Text>
    </>);
}

export default TestDetailScreen;