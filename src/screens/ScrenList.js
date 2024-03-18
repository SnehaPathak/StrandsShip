import DiaryScreen from "./diary/_DiaryScreen";
import BlogScreen from "./blog/BlogScreen";
import TestScreen from "./tests/TestScreen";
import GlossaryScreen from "./glossary/GlossaryScreen";
import HelpScreen from "./help/HelpScreen";
import AccountSettingsScreen from "./account/AccountSetttingsScreen";
import TestNavigationScreen from "./tests/TestNavigation";
import DiaryNavigator from "./diary/DiaryNavigator";
import DiaryItemAddScreen from "./diary/DiaryItemAddScren";
import AuthNavigator from "../navigators/AuthNavigator";
import HomeNavigator from "../navigators/HomeNavigator";

const name = "name";
const component = "component";

export const ScreenList = {
    AUTH_NAVIGATOR:{name:"AuthNavigator", component:AuthNavigator},
    HOME_NAVIGATOR:{name:"HomeNavigator", component:HomeNavigator},
    DIARY_NAVIGATOR: { name: "DiaryNavigator", component: DiaryNavigator },
    DIARY_LIST: { name: "DiaryList", component: DiaryScreen },
    DIARY_ITEM: { name: "DiaryItemAdd", component: DiaryItemAddScreen },
    BLOG: { name: "BlogList", component: BlogScreen },
    GLOSSARY: { name: "Glossary", component: GlossaryScreen },
    TEST: { name: "Test", component: TestScreen }
};
