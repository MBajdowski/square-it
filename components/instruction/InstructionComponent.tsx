import React from "react";
import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import {vw} from "../../utils/dimetionsUtils";

interface Props {
    text: string;
    images: ImageSourcePropType[];
}

export const InstructionComponent = ({text, images}: Props) => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.imageContainer}>
                {images.map((img, index) =>
                    <Image style={styles.image} key={'instructionImg' + index} source={img}/>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        padding: vw(5),
        paddingBottom: 0,
        display: "flex"
    },
    text: {
        fontSize: vw(4),
        fontWeight: "bold"
    },
    imageContainer: {
        flex: 1,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",

        padding: vw(2)
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        height: undefined,
        width: undefined,
        margin: vw(2)
    }
});