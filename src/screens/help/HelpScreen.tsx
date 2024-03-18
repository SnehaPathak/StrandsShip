import React from "react";
import { View } from "react-native";
import { Text, Modal } from "react-native-paper";

import StrandsStyle from "../../styles/Styles";

const HelpScreen = () => {
    return (
        <Modal visible={true} style={StrandsStyle.containerCenter}>
            <Text>Help Screen</Text>
        </Modal>
    )
}

export default HelpScreen;