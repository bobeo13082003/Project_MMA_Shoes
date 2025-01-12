import { Image, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import TextBetweenLine from "./text.between.line";
import ShareButton from "./share.button";
import fbLogo from "@/assets/images/fbLogo.png"
import ggLogo from "@/assets/images/ggLogo.png"


interface IProps {
    colorText?: StyleProp<TextStyle>,
    colorView?: StyleProp<ViewStyle>
}

const SocialButton = (props: IProps) => {
    const { colorText, colorView } = props;
    return (
        <View>
            <TextBetweenLine colorText={colorText} colorView={colorView} title="Sign in with" />
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                <ShareButton
                    icons={<Image style={{ width: 37, height: 37 }} source={fbLogo} />}
                    btnStyle={{ backgroundColor: "white", justifyContent: "center", borderRadius: 30, paddingHorizontal: 10, paddingVertical: 6 }}
                    textStyle={{ textTransform: "uppercase" }}
                    title="facebook"
                    onPress={() => alert("facebook")}
                />
                <ShareButton
                    icons={<Image style={{ width: 30, height: 30 }} source={ggLogo} />}
                    btnStyle={{ backgroundColor: "white", justifyContent: "center", borderRadius: 30, paddingHorizontal: 24, paddingVertical: 9 }}
                    textStyle={{ textTransform: "uppercase" }}
                    title="google"
                    onPress={() => alert("facebook")}
                />
            </View>
        </View>
    )
}

export default SocialButton;