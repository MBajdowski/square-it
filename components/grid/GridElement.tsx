import {GridElementState, GridElementType, N} from "../../utils/types";
import {StyleSheet, View} from "react-native";
import {TileElement} from "./TileElement";
import React from "react";
import {vw} from "../../utils/dimetionsUtils";
import {deepGridCopy, getFinalJokerElement, getPairs, hasPair} from "../../utils/gridStateUtils";

interface GridProps {
    grid: GridElementState[];
    handleGridPress: (newGrid: GridElementState[], newPoints?: number) => void;
    newElement: GridElementState;
}

export const GridElement = ({grid, handleGridPress, newElement}: GridProps) => {

    const handlePress = (element: GridElementState): void => {
        if (element.type !== GridElementType.EMPTY) {
            return;
        }

        const newGrid = deepGridCopy(grid);
        const elementToUpdate = newGrid.find(each => each.x === element.x && each.y === element.y);
        if (!elementToUpdate) {
            return;
        }

        if (newElement.type === GridElementType.JOKER) {
            let finalJokerElement = getFinalJokerElement(newGrid, elementToUpdate);
            elementToUpdate.type = finalJokerElement.type;
            elementToUpdate.value = finalJokerElement.value;
            elementToUpdate.bonus = finalJokerElement.bonus;
        } else {
            elementToUpdate.type = newElement.type;
            elementToUpdate.value = newElement.value;
            elementToUpdate.bonus = newElement.bonus;
        }

        let points = elementToUpdate.type === GridElementType.VALUE ? elementToUpdate.value : 0;
        let noOfComboMerges = 0;
        while (hasPair(newGrid, elementToUpdate)) {
            noOfComboMerges++;
            let pairElements: GridElementState[] = getPairs(newGrid, elementToUpdate);

            if (elementToUpdate.type === GridElementType.VALUE) {
                let bonusPoints = (pairElements.length - 1) * elementToUpdate.value;
                elementToUpdate.bonus = bonusPoints > 0;
                points += bonusPoints;
            }
            elementToUpdate.value = elementToUpdate.value * 2;

            pairElements.forEach(pair => {
                pair.type = GridElementType.EMPTY;
                pair.bonus = false;
                pair.value = 0;
            })
        }

        //Bonus za kombo połączeń
        if (elementToUpdate.type === GridElementType.VALUE && noOfComboMerges > 1) {
            elementToUpdate.bonus = true;
            points += elementToUpdate.value * noOfComboMerges / 2;
        }

        if (elementToUpdate.type === GridElementType.BLOCKED && elementToUpdate.value === 4) {
            //Bonus za czyszczenie czarnych
            points += 16;

            elementToUpdate.type = GridElementType.EMPTY;
            elementToUpdate.bonus = false;
            elementToUpdate.value = 0;
        }

        handleGridPress(newGrid, points);
    };

    return (
        <View style={styles.gridContainer}>
            {[...Array(N).keys()].map(n =>
                <View key={n} style={styles.row}>
                    {
                        grid.filter(e => e.y === n)
                            .map((e) => {
                                return (<TileElement key={`${e.x}-${e.y}`} element={e} handlePress={handlePress}/>);
                            })
                    }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",
        flexDirection: "row",
    },

    gridContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",

        height: vw(80),
        width: vw(80),
        backgroundColor: "#a4a4a4",
        padding: vw(0.5)
    },
});