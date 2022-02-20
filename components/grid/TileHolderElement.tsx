import {TileElement} from "./TileElement";
import {StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {GridElementState} from "../../utils/types";
import {emptyElement} from "../../utils/gridElementStateUtils";
import {vw} from "../../utils/dimetionsUtils";
import {retrieveObject, storeObject, TileHolderElementKey} from "../../utils/asyncStorageUtils";

interface HolderElementProps {
    newElement: GridElementState;
    onHolderElementChange: (holderElement: GridElementState) => void;
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

export const TileHolderElement = ({newElement, onHolderElementChange}: HolderElementProps) => {
    const [holderElement, setHolderElement] = useState<GridElementState>(emptyElement(-1, -1));

    useEffect(() => {
        initHolderElement()
    }, []);

    useEffect(() => {
        storeObject(TileHolderElementKey, holderElement);
    }, [holderElement])

    const initHolderElement = async () => {
        let elementFromStorage = await retrieveObject(TileHolderElementKey) ?? emptyElement(-1, -1);
        setHolderElement(elementFromStorage);
    }

    const handleHolderPress = (holderElement: GridElementState) => {
        setHolderElement(newElement);
        onHolderElementChange(holderElement);
    }

    return (
        <View style={styles.elementHolderContainer}>
            <TileElement element={holderElement} handlePress={handleHolderPress}/>
        </View>
    )
}