import { APP_COLOR } from "@/utils/constant";
import { ReactNode, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";


interface Iprops {
    title?: string,
    typeInput?: KeyboardTypeOptions | undefined;
    icons?: ReactNode,
    typePassword?: boolean,
    value?: string,
    setValue: (v: string) => void
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
    const { title, typeInput, icons, typePassword, value, setValue } = props;
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <View style={styles.inputGroup}>
            {title && <Text style={styles.textInput}>{title}</Text>}
            <TextInput
                value={value}
                onChangeText={(v) => setValue(v)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                keyboardType={typeInput}
                style={[styles.input,
                { borderColor: focus ? APP_COLOR.ORANGE : "#DDDDDE" }]}
                secureTextEntry={typePassword}
            />
            {icons}
        </View>
    )
}

export default ShareInput;