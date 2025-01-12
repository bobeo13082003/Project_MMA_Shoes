import { APP_COLOR } from "@/utils/constant";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface IProps {
    title: string,
    colorView?: StyleProp<ViewStyle>
    colorText?: StyleProp<TextStyle>
}

const TextBetweenLine = (props: IProps) => {
    const { title, colorView, colorText } = props;
    return (
        <View style={{ flexDirection: "row", gap: 15, justifyContent: "center", marginBottom: 15 }}>
            <View style={[{ borderBottomColor: "white", borderBottomWidth: 1, paddingHorizontal: 50 }, colorView]}></View>
            <View style={{ position: "relative", top: 8 }}>
                <Text style={[{ color: "white" }, colorText]}>{title}</Text>
            </View>
            <View style={[{ borderBottomColor: "white", borderBottomWidth: 1, paddingHorizontal: 50 }, colorView]}></View>
        </View>
    )
}

export default TextBetweenLine;