import ShareButton from "@/components/button/share.button";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import SocialButton from "@/components/button/social.button";
import { login } from "@/services/api/api";
import { toast } from "@/utils/toast";
import { Formik } from 'formik';
import { SigninSchema } from "@/utils/validate.schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { userLogin } from "@/redux/slices/userSlice";
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
    const dispatch = useDispatch<AppDispatch>();
    const handleLogin = async (email: string, password: string) => {
        try {
            const res = await login(email, password);
            if (res.data && res.data.code === 402) return router.replace({
                pathname: "/(auth)/vertify",
                params: { email }
            })
            if (res.data && res.data.code === 200) {
                toast('success', res.data.message)
                router.replace("/(tabs)")
                dispatch(userLogin(res.data.token))
            } else {
                toast('error', 'Error', res.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <View style={styles.container}>
        //     <View>
        //         <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign In</Text>
        //     </View>
        //     <ShareInput value={email} setValue={setEmail} typeInput="email-address" title="Email" />
        //     <ShareInput value={password} setValue={setPassword} typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
        //     <View>
        //         <Text style={{ textAlign: "center", fontWeight: "600", color: APP_COLOR.ORANGE }}>Forgot password ?</Text>
        //     </View>
        //     <View style={{ marginTop: 15 }}></View>
        //     <View>
        //         <ShareButton
        //             btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
        //             textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
        //             presStyle={{ alignSelf: "center" }}
        //             onPress={handleLogin}
        //             title="Sign In" />
        //     </View>
        //     <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
        //         <Text style={{ color: "black" }}>Don't have an account?</Text>
        //         <Link href={"/(auth)/signup"}>
        //             <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "600" }}> Sign up</Text>
        //         </Link>
        //     </View>
        //     <SocialButton colorText={{ color: "#AAAAAA" }} colorView={{ borderColor: "#AAAAAA" }} />
        // </View>
        <Formik
            validationSchema={SigninSchema}
            initialValues={{ email: '', password: '' }}
            onSubmit={values => handleLogin(values.email, values.password)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <View>
                        <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign In</Text>
                    </View>
                    <ShareInput error={errors.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} typeInput="email-address" title="Email" />
                    <ShareInput error={errors.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
                    <View>
                        <Text style={{ textAlign: "center", fontWeight: "600", color: APP_COLOR.ORANGE }}>Forgot password ?</Text>
                    </View>
                    <View style={{ marginTop: 15 }}></View>
                    <View>
                        <ShareButton
                            btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
                            textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
                            presStyle={{ alignSelf: "center" }}
                            onPress={handleSubmit}
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
            )}
        </Formik>
    )
}

export default Login;