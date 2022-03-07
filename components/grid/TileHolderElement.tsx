import {TileElement} from "./TileElement";
import {StyleSheet, View} from "react-native";
import React from "react";
import {GridElementState} from "../../utils/types";
import {vw} from "../../utils/dimetionsUtils";
import {useTileHolderElement} from "./useTileHolderElement";
import {useTileHolderElementLevel} from "./useTileHolderElementLevel";

interface HolderElementProps {
    newElement: GridElementState;
    onHolderElementChange: (holderElement: GridElementState) => void;
    isLevelMode: boolean;
}

const styles = StyleSheet.create({
    elementHolderContainer: {
        width: vw(15),
        height: vw(15),
        marginBottom: vw(1),
        padding: vw(0.5),
        backgroundColor: "lightgrey"
    }
});

export const TileHolderElement = ({newElement, onHolderElementChange, isLevelMode}: HolderElementProps) => {

    const {
        holderElement,
        handleHolderPress
    } = isLevelMode ?
        useTileHolderElementLevel({newElement, onHolderElementChange}) :
        useTileHolderElement({newElement, onHolderElementChange})

    return (
        <View style={styles.elementHolderContainer}>
            <TileElement element={holderElement} handlePress={handleHolderPress}/>
        </View>
    )
}