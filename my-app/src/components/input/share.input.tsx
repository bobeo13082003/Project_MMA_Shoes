import { APP_COLOR } from "@/utils/constant";
import { ReactNode, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";


interface Iprops {
    title?: string,
    typeInput?: KeyboardTypeOptions | undefined;
    icons?: ReactNode,
    typePassword?: boolean,
    value?: string,
    onChangeText?: any,
    onBlur?: any,
    error?: string
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 20,
        marginTop: 50
    },
    inputGroup: {

    },
    textInput: {
        fontSize: 15,
        opacity: 0.5
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        position: "relative"
    }
})
const ShareInput = (props: Iprops) => {
    const { title, typeInput, icons, typePassword, value, onChangeText, onBlur, error } = props;
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <View style={styles.inputGroup}>
            {title && <Text style={styles.textInput}>{title}</Text>}
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setFocus(true)}
                onBlur={(e) => { setFocus(false), onBlur(e) }}
                keyboardType={typeInput}
                style={[styles.input,
                { borderColor: focus ? APP_COLOR.ORANGE : "#DDDDDE" }]}
                secureTextEntry={typePassword}
            />
            {error && <Text style={{ color: "red", padding: 5 }}>{error}</Text>}
            {icons}
        </View>
    )
}

export default ShareInput;