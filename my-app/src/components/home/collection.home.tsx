import { View, Text, StyleSheet } from "react-native";

interface IProps {
    name: string
}

const styles = StyleSheet.create({
    item: {
        borderColor: "green",
        borderWidth: 1,
        height: 220,
        marginBottom: 6,
        width: "100%",
    },
})

const CollectionHome = (props: IProps) => {
    return (
        <View style={styles.item}>
            <Text>{props.name}</Text>
        </View>
    )
}

export default CollectionHome;