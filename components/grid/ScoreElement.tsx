import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {vw} from "../../utils/dimetionsUtils";

interface Props {
    score: number;
}

export const ScoreElement = ({score}: Props) => {

    return (
        <View style={styles.scoreContainer}>
            <Text style={styles.scoreTextContainer}>{score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scoreContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        marginBottom: vw(1)
    },

    scoreTextContainer: {
        fontWeight: "bold",
        fontSize: vw(8)
    }
});