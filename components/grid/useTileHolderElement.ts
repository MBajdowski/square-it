import {useEffect, useState} from "react";
import {GridElementState} from "../../utils/types";
import {emptyElement} from "../../utils/gridElementStateUtils";
import {retrieveObject, storeObject, TileHolderElementKey} from "../../utils/asyncStorageUtils";

interface HolderElementProps {
    newElement: GridElementState;
    onHolderElementChange: (holderElement: GridElementState) => void;
}

export const useTileHolderElement = ({newElement, onHolderElementChange}: HolderElementProps) => {
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

    return {
        holderElement,
        handleHolderPress
    }
}