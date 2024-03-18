import { ImageSourcePropType } from "react-native";

interface IMainBottomTabNavigation {
    name: string,
    component: () => JSX.Element,
    iconUnFocusedGlyph: string,
    iconFocusedGlyph: string,
    isVectorIcon: false,
    iconFocused?: any,
    iconUnFocused?:any
}