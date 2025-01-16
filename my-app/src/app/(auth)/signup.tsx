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
import { Formik } from 'formik';
import { SignupSchema } from "@/utils/validate.schema";

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
    const handleSignUp = async (userName: string, email: string, password: string) => {
        try {
            const res = await register(userName, email, password)
            if (res.data && res.data.code === 201) {
                toast('success', res.data?.message)
                router.replace({
                    pathname: "/(auth)/vertify",
                    params: { email }
                })
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
        //         <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign Up</Text>
        //     </View>
        //     <ShareInput value={userName} setValue={setUserName} title="Full name" />
        //     <ShareInput value={email} setValue={setEmail} typeInput="email-address" title="Email" />
        //     <ShareInput value={password} setValue={setPassword} typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
        //     <View style={{ marginTop: 15 }}></View>
        //     <View>
        //         <ShareButton
        //             btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
        //             textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
        //             presStyle={{ alignSelf: "center" }}
        //             onPress={handleSignUp}
        //             title="Sign Up" />
        //     </View>
        //     <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
        //         <Text style={{ color: "black" }}>Already have an account?</Text>
        //         <Link href={"/(auth)/login"}>
        //             <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "600" }}> Sign in</Text>
        //         </Link>
        //     </View>
        //     <SocialButton colorText={{ color: "#AAAAAA" }} colorView={{ borderColor: "#AAAAAA" }} />
        // </View>
        <Formik
            initialValues={{ fullName: '', email: '', password: '' }}
            onSubmit={values => handleSignUp(values.fullName, values.email, values.password)}
            validationSchema={SignupSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <View>
                        <Text style={{ fontSize: 35, fontWeight: "700" }}>Sign Up</Text>
                    </View>
                    <ShareInput error={errors.fullName} value={values.fullName} onBlur={handleBlur('fullName')} onChangeText={handleChange('fullName')} title="Full name" />
                    <ShareInput error={errors.email} value={values.email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} typeInput="email-address" title="Email" />
                    <ShareInput error={errors.password} value={values.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} typePassword={showPassword} icons={<Feather onPress={() => setShowPassword(!showPassword)} style={{ position: "absolute", left: 320, top: 30 }} name={showPassword ? "eye-off" : "eye"} size={24} color="black" />} title="Password" />
                    <View style={{ marginTop: 15 }}></View>
                    <View>
                        <ShareButton
                            btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 15, paddingHorizontal: 80, backgroundColor: APP_COLOR.ORANGE, opacity: 0.9 }}
                            textStyle={{ color: "white", textTransform: "uppercase", fontWeight: "600" }}
                            presStyle={{ alignSelf: "center" }}
                            onPress={handleSubmit}
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
            )}
        </Formik>
    )
}
export default Signup;