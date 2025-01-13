import ShareButton from "@/components/button/share.button";
import Toast from 'react-native-toast-message';
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native"
import { Link, router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import SocialButton from "@/components/button/social.button";
import { register } from "@/services/api/api";
import { toast } from "@/utils/toast";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 20,
        marginTop: 50
    },
})

const Signup = () => {
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    const handleSignUp = async () => {
        try {
            if (!userName) {
                return toast('error', 'Error', "Passsword Not Empty")
            }
            if (!email) {
                return toast('error', 'Error', "Passsword Not Empty")
            }
            if (!password) {
                return toast('error', 'Error', "Passsword Not Empty")
            }
            const res = await register(userName, email, password)
            if (res.data && res.data.code === 201) {
                toast('success', res.data?.message)
                setUserName("")
                setEmail("")
                setPassword("")
                router.navigate("/(auth)/vertify")
            } else {
                toast('error', 'Error', res.message)
            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign Up</Text>
            </View>
            <ShareInput value={userName} setValue={setUserName} title="Full name" />
            <ShareInput value={email} setValue={setEmail} typeInput="email-address" title="Email" />
            <ShareInput value={password} setValue={setPassword} typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
            <View style={{ marginTop: 15 }}></View>
            <View>
                <ShareButton
                    btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
                    textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
                    presStyle={{ alignSelf: "center" }}
                    onPress={handleSignUp}
                    title="Sign Up" />
            </View>
            <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
                <Text style={{ color: "black" }}>Already have an account?</Text>
                <Link href={"/(auth)/login"}>
                    <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "600" }}> Sign in</Text>
                </Link>
            </View>
            <SocialButton colorText={{ color: "#AAAAAA" }} colorView={{ borderColor: "#AAAAAA" }} />
        </View>
    )
}
export default Signup;