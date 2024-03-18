import { StyleSheet } from "react-native";
import CONSTANTS from "../../constants";
import { Colors, Styles } from "../../styles/Index";

const LoginCommonStyle = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY_BLUE,
        flex:1
    },
    containerOverlay:
    {
        flex:1,
        width:"100%",
        backgroundColor: "white",
        marginTop:18,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems:"stretch",
        paddingTop:29,
        paddingLeft:24,
        paddingRight:24,
        paddingBottom:50,
    },
    headerBackground:
    {
        backgroundColor: Colors.PRIMARY_BLUE
    },
    headerTitle:
    {
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    },
    errorServer:
    {
        fontFamily:CONSTANTS.FONT_FAMILY,
        fontSize:14,
        color:"red",
        width:"100%",
        alignItems:"center"
    }
})

export default LoginCommonStyle;