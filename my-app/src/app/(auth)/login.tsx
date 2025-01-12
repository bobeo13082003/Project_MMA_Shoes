import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import SocialButton from "@/components/button/social.button";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 20,
        marginTop: 50
    },
})

const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(true)
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign In</Text>
            </View>
            <ShareInput typeInput="email-address" title="Email" />
            <ShareInput typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
            <View>
                <Text style={{ textAlign: "center", fontWeight: "600", color: APP_COLOR.ORANGE }}>Forgot password ?</Text>
            </View>
            <View style={{ marginTop: 15 }}></View>
            <View>
                <ShareButton
                    btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
                    textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
                    presStyle={{ alignSelf: "center" }}
                    onPress={() => alert("facebook")}
                    title="Sign In" />
            </View>
            <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
                <Text style={{ color: "black" }}>Don't have an account?</Text>
                <Link href={"/(auth)/signup"}>
                    <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "600" }}> Sign up</Text>
                </Link>
            </View>
            <SocialButton colorText={{ color: "#AAAAAA" }} colorView={{ borderColor: "#AAAAAA" }} />
        </View>
    )
}

export default Login;