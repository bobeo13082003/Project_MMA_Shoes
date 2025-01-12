import React, { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";


interface IProps {
    title: string,
    onPress: () => void,
    textStyle?: StyleProp<TextStyle>,
    presStyle?: StyleProp<ViewStyle>,
    btnStyle?: StyleProp<ViewStyle>,
    icons?: ReactNode
}

const ShareButton = (props: IProps) => {
    const { title, onPress, textStyle, presStyle, btnStyle, icons } = props;
    return (
        <Pressable style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1, alignSelf: "flex-start" }, presStyle])} onPress={onPress}>
            <View style={[style.btnContainer, btnStyle]}>
                {icons}

                <Text style={textStyle}>{title}</Text>
            </View>
        </Pressable>
    )
}

const style = StyleSheet.create({
    text: {
        textTransform: "uppercase",
    },
    btnContainer: {
        borderColor: "green",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderRadius: 10,
        backgroundColor: "#ccc"
    }
})

export default ShareButton