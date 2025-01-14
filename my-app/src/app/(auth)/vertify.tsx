import { Keyboard, StyleSheet, Text, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import OTPTextView from 'react-native-otp-textinput';
import { APP_COLOR } from "@/utils/constant";
import OverlayLoading from "@/components/loading/loading";
import { resendOtp, vertify } from "@/services/api/api";
import { router, useLocalSearchParams } from "expo-router";
import { toast } from "@/utils/toast";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        gap: 30
    },
    heading: {
        fontSize: 40,
        fontWeight: "600",
        marginVertical: 30
    }
})


const Vertify = () => {
    const [otp, setOtp] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const input = useRef<OTPTextView>(null);
    const { email } = useLocalSearchParams();

    const vertifyCode = async () => {
        try {
            Keyboard.dismiss()
            setIsSubmit(true);
            const res = await vertify(otp, email as string)
            setIsSubmit(false)
            if (res.data && res.data.code === 200) {
                toast('success', res.data?.message)
                input.current?.clear();
                router.replace("/(auth)/login");
            } else {
                toast('error', "Error", res?.message)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const handleResendCode = async () => {
        try {
            if (!email) {
                toast('error', 'Error', "Email Not Exits")
            }
            input.current?.clear();
            const res = await resendOtp(email as string)
            if (res.data && res.data.code === 200) {
                toast('success', res.data.message)
            } else {
                toast('error', 'Error', res.message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (otp && otp.length === 6) {
            vertifyCode()
        }
    }, [otp])
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.heading}>Vertify</Text>
                    <Text>Please type the vertification code sent to {email}</Text>
                </View>
                <OTPTextView
                    autoFocus
                    handleTextChange={setOtp}
                    inputCount={6}
                    inputCellLength={1}
                    tintColor={APP_COLOR.ORANGE}
                    textInputStyle={{
                        borderWidth: 1,
                        borderColor: "grey",
                        borderRadius: 5,
                        borderBottomWidth: 1,
                        // @ts-ignore:next-line
                        color: APP_COLOR.ORANGE
                    }}
                />
                <View>
                    <Text>I don't recevie a code <Text onPress={handleResendCode} style={{ color: APP_COLOR.ORANGE, textDecorationLine: "underline", fontWeight: "500" }}>Please resend</Text></Text>
                </View>
            </View>
            {isSubmit && <OverlayLoading />}
        </>
    )
}

export default Vertify