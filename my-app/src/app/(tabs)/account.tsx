import { userLogout } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { router } from "expo-router";
import { Button, Text, View } from "react-native"
import { useDispatch } from "react-redux"

const Account = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(userLogout())
        router.replace("/(auth)/wellcome")
    }
    return (
        <View>
            <Text>Account</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Account;