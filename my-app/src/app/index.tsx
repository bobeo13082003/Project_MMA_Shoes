import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import ShareButton from "components/button/share.button";
import { APP_COLOR } from "@/utils/constant";
import bgWelcome from "@/assets/images/Welcome.png"
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect } from "expo-router";
import SocialButton from "@/components/button/social.button";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    welcomeText: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    welcomeButton: {
        flex: 0.4,
        gap: 15
    },
    heading: {
        fontSize: 40,
        fontWeight: "600"
    },
    body: {
        marginVertical: 10,
        fontSize: 30,
        color: APP_COLOR.ORANGE,
    },
    footer: {
    },
    btnContainer: {

    },
    signinContent: {
        alignItems: "center",
        paddingTop: 10,
        borderBottomColor: APP_COLOR.ORANGE,
        borderBottomWidth: 1,
        marginHorizontal: 50
    },
    signinText: {
        backgroundColor: "#fff",
        position: "relative",
        padding: 10,
        top: 20
    }
})

const WelcomePage = () => {

    // if (true) {
    //     return (
    //         <Redirect href={"/(auth)/vertify"} />
    //     )
    // }

    return (
        <ImageBackground style={{ flex: 1 }} source={bgWelcome}>
            <LinearGradient locations={[0.1, 0.8]} style={{ flex: 1 }} colors={['transparent', 'rgba(0,0,0,0.8)']}>

                <View style={styles.container}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.heading}>Welcome to</Text>
                        <Text style={styles.body}>@Bobeo - Food</Text>
                        <Text style={styles.footer}>Your go-to app for delicious meals!</Text>
                    </View>
                    <View style={styles.welcomeButton}>
                        <SocialButton />
                        <View>
                            <ShareButton
                                btnStyle={{ borderColor: "#ccc", borderWidth: 1, justifyContent: "center", borderRadius: 30, paddingVertical: 10, paddingHorizontal: 60, marginHorizontal: 30, backgroundColor: "black", opacity: 0.9 }}
                                textStyle={{ color: "white" }}
                                presStyle={{ alignSelf: "stretch" }}
                                onPress={() => alert("facebook")}
                                title="Start with your mail" />
                        </View>
                        <View style={{ flexDirection: "row", gap: 5, justifyContent: "center" }}>
                            <Text style={{ color: "white" }}>Already have an account?</Text>
                            <Link href={"/(auth)/signup"}>
                                <Text style={{ color: "white", textDecorationLine: "underline" }}> Sign in</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default WelcomePage;