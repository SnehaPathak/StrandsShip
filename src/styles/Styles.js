import { StyleSheet } from "react-native";
import StrandsColors from "./Colors";
// [Sneha] - import "StrandsColors" in this Stylesheet directly from "Colors"
// rather than Index. This ensures that Colors is initialized 
// before Styles, in turn using "Colors"

const AppStyle =
    StyleSheet
        .create({
            containerCenter: {
                flex: 1,
                alignItems: "center",
                justifyContent: "top",
                padding: 0,
                margin: 0,
                backgroundColor: "white"
            },
            containerLeftTop: {
                flex: 1,
                alignItems: "flex-start",
                backgroundColor: "white"
            },
            logoContainer: {
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
            },
            arrowDropDown: {
                height: 12,
                width: 12,
                color: "white",
                textAlignVertical: "center",
                marginLeft: 4,
                textAlign: "center",
                marginTop: 5
            },
            containerCenterBlue: {
                flex: 1,
                alignItems: "center",
                justifyContent: "top",
                padding: 0,
                margin: 0,
                backgroundColor: StrandsColors.PRIMARY_BLUE
            },
            containerBlueOverlay:
            {
                flex: 1,
                width: "100%",
                backgroundColor: "white",
                // marginTop: 18,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                alignItems: "stretch",
                paddingTop:15,
                paddingLeft: 24,
                paddingRight: 24,
                paddingBottom: 15,
                shadowOpacity:0.5,
                shadowColor:StrandsColors.GREY_MEDIUM
            },
        });

const AppBarBottomNavStyle = StyleSheet.create({
    container:
    {
        flexDirection: "row",
        paddingTop: 34,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        backgroundColor: StrandsColors.PRIMARY_BLUE,
        color: "white"
    },
    label:
    {
        color: "white",
        fontSize: 24,
        fontFamily: "open-sans",
        fontWeight: "bold"
    }
});

const Styles = {
    AppStyle,
    AppBarBottomNavStyle
}


export default Styles;