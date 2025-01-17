import { RootState } from "@/redux/store";
import { Text, View } from "react-native"
import { useSelector } from "react-redux";

const Order = () => {
    // const token = useSelector((state: RootState) => state.user.token)
    return (
        <View>
            <Text>Order</Text>
        </View>
    )
}

export default Order;