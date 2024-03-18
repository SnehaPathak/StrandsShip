import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-paper";
// import { useUser } from "@realm/react";
import AuthManager from "../helpers/AuthManager";
import { useCallback } from "react";
import { useNavigation } from '@react-navigation/native';

import { images } from "../assets";
import { SCREENS_IDX } from "../constants";
import { IUserAccountViewModel } from "../types/ViewModels/IUserAccountViewModel";


const AppBarRightIcons = () => {

    // const user = useUser();
    // const doSignOut = useCallback(() => {
    //     AuthManager.DoLogOut();
    // }, [user]);
    const [userInitials, setUserInitials] = useState("");
    let user:IUserAccountViewModel | null;
    const getUser = (async () => { 
       user = await  AuthManager.GetUser();
       console.log(`user initials is ${user?.first_name.substring(0,1)}${user?.last_name.substring(0,1)}`)
       setUserInitials((`${user?.first_name.substring(0,1)}${user?.last_name.substring(0,1)}`));
    })
    getUser();
    
    const navigation = useNavigation();

    const doSignOut = () => {
        
        console.log(`user from AppBarRightIcons is ${JSON.stringify(user)}`)
        AuthManager.DoLogOut()
        .then(() => {
            // navigation.reset({
            //     index:0,
            //     routeNames:
            // })
            navigation.reset({
                index: 0,
                routes: [{ name: SCREENS_IDX.AUTH_NAV }]
              })
            }
        )
    
    }

    const onHelpTapped = () => { }
    const onShopTapped = () => { }
    const onAvatarTapped = () => {
        doSignOut();
    }

    let imageUrl: string | null = null;
    
    let avatarContent;

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    console.log(`imageUrl is ${imageUrl}`);
    if (imageUrl) {
        avatarContent =
            <Avatar.Image size={40}
                source={{ uri: imageUrl }}
                style={AppBarRightIconStyles.avatarIcon} />
    }
    else {
        avatarContent = <Avatar.Text label={userInitials}
            size={40}
            labelStyle={{ ...AppBarRightIconStyles.avatarLabelIcon }} />
    }

    return (
        <View style={AppBarRightIconStyles.container}>
            <View style={AppBarRightIconStyles.iconContainer}>
                <TouchableWithoutFeedback onPress={onHelpTapped}>
                    <Image
                        source={images.ICN_HELP_PERSON}
                        style={AppBarRightIconStyles.helpIcon}></Image>
                </TouchableWithoutFeedback>
            </View>
            <View style={AppBarRightIconStyles.iconContainer}>
                <TouchableWithoutFeedback onPress={onShopTapped}>
                    <Image
                        source={images.ICN_SHOP_BAG}
                        style={AppBarRightIconStyles.helpIcon}></Image>
                </TouchableWithoutFeedback>
            </View>
            <View style={AppBarRightIconStyles.iconContainer}>
                <TouchableWithoutFeedback onPress={onAvatarTapped}>
                    <View style={AppBarRightIconStyles.avatarContainer}>
                        {avatarContent}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );

}

export default AppBarRightIcons;

const AppBarRightIconStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        marginLeft: 13
    },
    helpIcon: {
        width: 24,
        height: 24,
    },
    shopIcon: {
        height: 24,
        width: 24,
        marginLeft: 38
    },
    avatarContainer:
    {
    },
    avatarIcon: {
        borderColor: "white",
        borderWidth: 2
    },
    avatarLabelIcon:
    {
        fontSize:16,
        fontWeight:"bold"
    },
    avatarLabelText:
    {
        color: "white"
    }
});