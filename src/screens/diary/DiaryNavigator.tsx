import { createStackNavigator } from "@react-navigation/stack";

import DiaryScreen from "./DiaryScreen";
import SymptomScreen from "./SymptomScreen";
import DiaryItemAddScreen from "./DiaryItemAddScren";

const DiaryStack = createStackNavigator();

const DiaryNavigator = () => {
    return (
        <DiaryStack.Navigator
            screenOptions={{headerShown:false}}>
            <DiaryStack.Screen name="DiaryList" component={DiaryScreen} />
            <DiaryStack.Screen name="Symptom" component={SymptomScreen} />
            <DiaryStack.Screen name="DiaryItemAdd" component={DiaryItemAddScreen}/>
        </DiaryStack.Navigator>
    )
}

export default DiaryNavigator;
