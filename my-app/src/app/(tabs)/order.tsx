
import { getOrderHistory } from "@/services/api/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native"


const Order = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistoryData[]>([]);

    const getAllOrderHistory = async () => {
        try {
            const res = await getOrderHistory();
            if (res && res.data.code === 200) {
                setOrderHistory(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllOrderHistory()
    }, [])


    return (
        <View style={style.container}>
            <Text style={style.header}>Order History</Text>
            <FlatList
                data={orderHistory}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => {
                    return (
                        <>
                            {item.orderItems.map((order) => (
                                <View style={style.item}>
                                    <View>
                                        <Image style={style.image} source={{ uri: order.image }} />
                                    </View>
                                    <View style={style.content}>
                                        <Text style={style.title}>{order.title}</Text>
                                        <Text style={style.title}>Address: {item.address}</Text>
                                        <Text style={style.title}>Price: {order.price} VND</Text>
                                        <Text style={style.title}>Status: <Text style={item.status === "CONFIRMED" ? style.confirmedStatus : { color: "red" }}>{item.status}</Text></Text>
                                    </View>
                                </View>
                            ))}
                        </>
                    )
                }}
            />

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        padding: 10,
        fontWeight: 600,
        fontSize: 18,
        color: APP_COLOR.ORANGE
    },
    item: {
        flexDirection: "row",
        gap: 10,
        borderBottomWidth: 10,
        borderBottomColor: "#D4D4D4",
        padding: 10
    },
    image: {
        width: 120,
        height: 120
    },
    content: {
        gap: 10,
    },
    title: {
        fontWeight: 600,
        fontSize: 16
    },
    confirmedStatus: {
        color: "green"
    }
})

export default Order;