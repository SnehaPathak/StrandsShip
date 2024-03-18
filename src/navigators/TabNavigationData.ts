import screens from "../screens/Index";
import { images } from "../assets";
import { IMainBottomTabNavigation } from "../types/ViewModels/Index";

const TabNavigationData : Array<IMainBottomTabNavigation> = [
    {
        name: "Diary",
        component: screens.DiaryNavigator,
        isVectorIcon: false,
        iconFocused:images.ICN_TAB_DIARY,
        iconUnFocused:images.ICN_TAB_DIARY_UNFOCUSED
    },
    {
        name: "Results",
        component: screens.ResultListScreen,
        isVectorIcon:false,
        iconFocused:images.ICN_TAB_RESULTS,
        iconUnFocused:images.ICN_TAB_RESULTS_UNFOCUSED
    },
    {
        name: "Community",
        component:screens.PostListScreen,
        isVectorIcon:false,
        iconFocused:images.ICN_TAB_COMMUNITY,
        iconUnFocused:images.ICN_TAB_COMMUNITY_UNFOCUSED
    },
    {
        name: "Food",
        component:screens.RecipeListScreen,
        isVectorIcon:false,
        iconFocused:images.ICN_TAB_FOOD,
        iconUnFocused:images.ICN_TAB_FOOD_UNFOCUSED
    }
]

export default TabNavigationData;