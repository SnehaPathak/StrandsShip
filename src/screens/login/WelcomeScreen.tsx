import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import { Colors, Styles } from '../../styles/Index';
import { images } from '../../assets';
import CONSTANTS, { SCREENS_IDX } from '../../constants';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from '../../hooks/useAuth';
import AuthManager from '../../helpers/AuthManager';

const WelcomeScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)

    // const authManager = useAuth()

    const onLogin = () => {
        navigation.removeListener();
        navigation.navigate("Login");
    }

    useEffect(() => {
        tryToLoginFirst()
    }, [])

    // authManager.

    const tryToLoginFirst = async () => {
       const user = await AuthManager
            .CurrentUser
            .load();

            if(user != null && user !== undefined)
            {
                console.log(`user log from welcome screen is ${JSON.stringify(user)}`);
                Keyboard.dismiss();
                
                navigation.reset({
                    index: 0,
                    routes: [{ name: SCREENS_IDX.HOME_NAV }]
                  })
                  
            }
            setIsLoading(false);

            // .then(response => {
                // if (response?.user) {
                //     const user = response.user
                    //   dispatch(
                    //     setUserData({
                    //       user: response.user,
                    //     }),
                    //   )
                    //   Keyboard.dismiss()
                    //   if (user?.role === 'admin') {
                    //     navigation.reset({
                    //       index: 0,
                    //       routes: [{ name: 'AdminStack', params: { user } }],
                    //     })
                    //   } else {
                    //     navigation.reset({
                    //       index: 0,
                    //       routes: [{ name: 'MainStack', params: { user } }],
                    //     })
                    //   }
                    //   if (Platform.OS !== 'web') {
                    //     handleInitialNotification()
                    //   }
            //         return
            //     }
            //     setIsLoading(false)
            // })
            // .catch(error => {
            //     console.log(error)
            //     setIsLoading(false)
            // })
    }


    if (isLoading == true) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <Image
                source={images.IMG_WELCOME_TOP_BACKGROUND}></Image>

            <View style={WelcomeStyle.bottomBackgroundContainer}>
                <View style={WelcomeStyle.bottomBackgroundTop}></View>
                <View style={WelcomeStyle.bottomBackgroundBottom}>
                    <Image source={images.IMG_WELCOME_BOTTOM_BACKGROUND} />
                </View>
            </View>
            <View style={WelcomeStyle.logoOverlay}>
                <View style={WelcomeStyle.logoOverlayDividerOne}></View>
                <View style={WelcomeStyle.logoOverlayDividerTwo}>
                    <Image source={images.IMG_LOGO_WELCOME}
                        style={WelcomeStyle.logo} />
                </View>
            </View>
            <View style={WelcomeStyle.contentContainer}>
                <View style={WelcomeStyle.topContainer} />
                <View style={WelcomeStyle.bottomContainer}>
                    <View style={WelcomeStyle.welcomeTextContainer}>
                        <Text style={WelcomeStyle.title}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}>Welcome to 5Strands!</Text>
                        <View style={WelcomeStyle.subtitleContainer}>
                            <Text style={WelcomeStyle.subtitle}>
                                Join
                            </Text>
                            <Text style={WelcomeStyle.subtitleOrangeBox}>
                                250,000
                            </Text>
                            <Text style={WelcomeStyle.subtitle}>
                                families
                            </Text>
                        </View>
                    </View>

                    {/* [Sneha] - aligned items in code from bottom to up because 
                    the style class "buttonsContainer"
                    uses flex options "column-reverse" to align content to the bottom */}
                    <View style={WelcomeStyle.buttonsContainer}>
                        <View style={WelcomeStyle.loginLinkContainer}>

                            <Text style={WelcomeStyle.loginInfo}>
                                Already have an account?
                            </Text>
                            <Text style={WelcomeStyle.loginLink}
                                onPress={onLogin}>
                                Log in
                            </Text>

                        </View>
                        <Pressable style={WelcomeStyle.buttonWrapper}>
                            <Image source={images.ICN_GOOGLE}
                                style={WelcomeStyle.buttonIconImage} />
                            <Text style={WelcomeStyle.buttonText}>Sign up with Google</Text>
                        </Pressable>
                        <Pressable style={WelcomeStyle.buttonWrapper}>
                            <Ionicons name="mail-outline" style={WelcomeStyle.buttonIcon}></Ionicons>
                            <Text style={WelcomeStyle.buttonText}>Sign up with email</Text>
                        </Pressable>

                    </View>
                    <View style={WelcomeStyle.footerContainer}>
                        <View style={WelcomeStyle.separator}></View>
                        <Text style={WelcomeStyle.footerText}
                            adjustsFontSizeToFit={true}>
                            Terms of Service & Privacy Policy
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default WelcomeScreen;

const WelcomeStyle = StyleSheet.create({
    bottomBackgroundContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%"
    },
    bottomBackgroundTop: {
        flex: 0.3,
    },
    bottomBackgroundBottom: {
        flex: 0.7,
        borderWidth: 0,
    },
    logoOverlay:
    {
        top: 0,
        flex: 1,
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "transparent",
        width: "100%",
        height: "100%"
    },
    logoOverlayDividerOne:
    {
        flex: 0.15,
    },
    logoOverlayDividerTwo:
    {
        flex: 0.85,
    }
    ,
    logoOverlyaDividerThree:
    {
        flex: 0.65
    },
    logo:
    {
        alignSelf: "center",
        marginLeft: 20,
        marginRight: 20
    },
    contentContainer:
    {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%"
    },
    topContainer:
    {
        flex: 0.4,
    },
    bottomContainer:
    {
        flex: 0.6,
        flexDirection: "column",
    },
    welcomeTextContainer:
    {
        flex: 0.20,
        alignContent: "center",
        alignItems: "center",
    },
    buttonsContainer:
    {
        flex: 0.5,
        alignContent: "center",
        flexDirection: "column-reverse",
        verticalAlign: "bottom",
    },
    footerContainer:
    {
        flex: 0.3,
        justifyContent: "center"

    },
    title:
    {
        fontSize: 34,
        fontFamily: CONSTANTS.FONT_FAMILY,
        color: "white",
        fontWeight: "bold",
        width: "100%",
        paddingLeft: 34,
        paddingRight: 34,

    },
    subtitleContainer:
    {
        marginLeft: 34,
        marginRight: 34,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center"
    },
    subtitle:
    {
        fontFamily: CONSTANTS.FONT_FAMILY,
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
    },
    subtitleOrangeBox:
    {
        fontFamily: CONSTANTS.FONT_FAMILY,
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        backgroundColor: Colors.ORANGE_PRIMARY,
        borderRadius: 17,
        marginLeft: 7,
        marginRight: 7,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        overflow: "hidden"
    },
    buttonWrapper:
    {
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginLeft: 34,
        marginRight: 34,
        padding: 15.5,
        flexDirection: "row"
    },
    buttonIcon:
    {
        color: Colors.BLACK_DARK,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 24
    },
    buttonIconImage:
    {
        height: 24,
        width: 24
    },
    buttonText:
    {
        color: Colors.BLACK_DARK,
        fontFamily: CONSTANTS.FONT_FAMILY,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: "600"
    },
    loginLinkContainer:
    {
        justifyContent: "center",
        marginTop: 24,
        flexDirection: "row"
    },
    loginInfo:
    {
        fontSize: 16,
        color: "white",
        fontFamily: CONSTANTS.FONT_FAMILY,
        textDecorationColor: "white"
    },
    loginLink:
    {
        fontSize: 16,
        color: "white",
        fontFamily: CONSTANTS.FONT_FAMILY,
        textDecorationLine: "underline",
        textDecorationColor: "white",
        marginLeft: 6
    },
    footerText:
    {
        fontSize: 14,
        color: "white",
        alignSelf: "center",
        marginLeft: 24,
        marginRight: 24,
        marginTop: 32,
        marginBottom: 32
    },
    separator:
    {
        backgroundColor: "white",
        height: 1,
        marginLeft: 24,
        marginRight: 24,
        marginTop: 10
    }
})