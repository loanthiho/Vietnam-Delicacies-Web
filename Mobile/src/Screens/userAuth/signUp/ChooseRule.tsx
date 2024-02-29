import React from "react";
import { ImageBackground, SafeAreaView, TouchableOpacity, View, Text } from "react-native";

const ChooseRole: React.FC = ({ navigation, route }: any) => {
    const { params } = route;
    console.log("param:", params);
    return (
        <View>
            <Text>Hi</Text>

        </View>
    )
}
export default ChooseRole;