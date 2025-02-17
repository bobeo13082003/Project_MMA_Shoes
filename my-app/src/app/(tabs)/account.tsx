import { userLogout } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { router } from "expo-router";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useDispatch } from "react-redux"

const Account = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(userLogout())
        router.replace("/(auth)/wellcome")
    }
    return (
        // <View>
        //     <Text>Account</Text>
        //     <Button title="Logout" onPress={handleLogout} />
        // </View>
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://via.placeholder.com/100" }}
                    style={styles.avatar}
                />
            </View>

            {/* User Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value="Sophia Patel" editable={false} />

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value="sophiapatel@gmail.com" editable={false} />

                <Text style={styles.label}>Delivery address</Text>
                <TextInput style={styles.input} value="123 Main St Apartment 4A, New York, NY" editable={false} />

                <Text style={styles.label}>Password <Feather name="lock" size={16} color="gray" /></Text>
                <TextInput style={styles.input} value="********" secureTextEntry editable={false} />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                    <Feather name="edit" size={20} color="white" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log out</Text>
                    <MaterialIcons name="logout" size={20} color="red" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    infoContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 5,
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    editButton: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    logoutButton: {
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        marginRight: 5,
    },
    logoutText: {
        color: "red",
        fontSize: 16,
        marginRight: 5,
    },
    icon: {
        marginLeft: 5,
    },
});
export default Account;