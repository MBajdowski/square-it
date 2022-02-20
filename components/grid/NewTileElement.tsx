import React from "react";
import {StyleSheet, View} from "react-native";
import {TileElement} from "./TileElement";
import {vw} from "../../utils/dimetionsUtils";
import {GridElementState} from "../../utils/types";

const styles = StyleSheet.create({
    newElementContainer: {
        height: vw(15),
        width: vw(15)
    }
});

interface NewElementProps {
    newElement: GridElementState;
}

export const NewTileElement = ({newElement}: NewElementProps) => {

    return (
        <View style={styles.newElementContainer}>
            <TileElement element={newElement} handlePress={() => {
            }}/>
        </View>
    );
}