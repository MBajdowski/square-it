import {useState} from "react";
import {GridElementState} from "../../utils/types";
import {emptyElement} from "../../utils/gridElementStateUtils";

interface HolderElementProps {
    newElement: GridElementState;
    onHolderElementChange: (holderElement: GridElementState) => void;
}

export const useTileHolderElementLevel = ({newElement, onHolderElementChange}: HolderElementProps) => {
    const [holderElement, setHolderElement] = useState<GridElementState>(emptyElement(-1, -1));


    const handleHolderPress = (holderElement: GridElementState) => {
        setHolderElement(newElement);
        onHolderElementChange(holderElement);
    }

    return {
        holderElement,
        handleHolderPress
    }
}