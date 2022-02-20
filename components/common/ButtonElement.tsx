import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from "react-native";
import React from "react";
import {vw} from "../../utils/dimetionsUtils";

interface Props {
    text: string;
    onPress: () => void;
    buttonStyle?: StyleProp<ViewStyle>;
}

export const ButtonElement = ({text, onPress, buttonStyle}: Props) => {

    return (
        <Pressable
            style={({pressed}) => [{backgroundColor: pressed ? "#006680" : "#00a5cf"}, styles.button, buttonStyle]}
            onPress={() => onPress()}>
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: vw(50),
        borderRadius: vw(20),
        padding: vw(2),
        elevation: 2,
        marginBottom: vw(5),
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: vw(5)
    }
});