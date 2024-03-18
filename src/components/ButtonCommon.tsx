import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    GestureResponderEvent,
    PressableProps,
    StyleProp,
    ViewProps,
    ViewStyle,
    PressableStateCallbackType
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Colors } from "../styles/Index";
import CONSTANTS from "../constants";
import { IsBlank } from "../helpers/ContentChecks";

interface IButtonCommonProps extends PressableProps,
    Omit<ViewProps, 'children' | 'style' | 'hitSlop'> {
    title: string,
    theme: "orange" | "blue" | "white",
    buttonStyle?: | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
    | undefined,
    icnName?: string,
    icnImage?: any,
    onPressAction?: null | ((event: GestureResponderEvent) => void) | undefined;
}

enum ButtonColor {
    orange = "orange",
    white = "white",
    blue = "blue"
}

const ButtonCommon = (props: IButtonCommonProps) => {
    const {
        title,
        theme,
        buttonStyle,
        onPressAction: action,
        icnName,
        icnImage,
        ...buttonProps } = props;

    if (IsBlank(props.title)) {
        props.title = "Button";
    }

    let buttonTheme;
    let textColor;
    let imgContent;

    if (icnName && !IsBlank(icnName)) {
        imgContent = <MaterialIcons name={icnName} style={ButtonStyle.buttonIcon} />
    }

    if (!icnName && icnImage) {
        imgContent = <Image source={icnImage} style={ButtonStyle.buttonIconImage} />
    }

    if (theme == ButtonColor.orange) {
        buttonTheme = ButtonStyle.buttonOrangeWrapper;
        textColor = ButtonStyle.textLight;
    }
    if (theme == ButtonColor.white.toString()) {
        buttonTheme = ButtonStyle.buttonWhiteWrapper;
        textColor = ButtonStyle.textDark;
    }
    if (theme == ButtonColor.blue.toString()) {
        buttonTheme = ButtonStyle.buttonBlueWrapper;
        textColor = ButtonStyle.textLight;
    }

    let buttonStyleObj = {};
    if (buttonStyle) {
        buttonStyleObj = buttonStyle;
    }

    let content = (
        <Pressable
            style={{ ...buttonStyleObj, ...buttonTheme }}
            onPress={props.onPressAction}
            {...buttonProps} >
            {imgContent}
            <Text style={textColor}>{props.title}</Text>
        </Pressable>
    );

    return content;
}

export default ButtonCommon;

const ButtonStyle = StyleSheet.create({
    buttonDisabledWrapper:
    {
        backgroundColor: Colors.GREY_LIGHT,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 34,
        marginRight: 34,
        padding: 15.5,
        flexDirection: "row",
        width: "100%"
    },
    buttonOrangeWrapper:
    {
        backgroundColor: Colors.ORANGE_PRIMARY,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 34,
        marginRight: 34,
        padding: 15.5,
        flexDirection: "row",
        width: "100%"
    },
    buttonBlueWrapper:
    {
        backgroundColor: Colors.PRIMARY_BLUE,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 34,
        marginRight: 34,
        padding: 15.5,
        flexDirection: "row",
        width: "100%"
    },
    buttonWhiteWrapper:
    {
        backgroundColor: "white",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: Colors.LINE_LIGHT,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 34,
        marginRight: 34,
        padding: 15.5,
        flexDirection: "row",
        width: "100%"
    },
    textDark:
    {
        color: Colors.BLACK_DARK,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600"
    },
    textLight:
    {
        color: "white",
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600"
    },
    textDisabled:
    {
        color: Colors.GREY_MEDIUM,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600"
    },
    buttonIcon:
    {
        color: Colors.BLACK_DARK,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 24,
        marginRight: 8
    },
    buttonIconImage:
    {
        height: 24,
        width: 24,
        marginRight: 8
    },
});