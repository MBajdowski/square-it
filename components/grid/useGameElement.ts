import {useEffect, useState} from "react";
import {GridElementState, GridElementType} from "../../utils/types";
import {deepGridCopy} from "../../utils/gridStateUtils";
import {
    blockedElement,
    emptyElement,
    jokerElement,
    newValueElement,
    newValueElementWithValue
} from "../../utils/gridElementStateUtils";
import {getRandomWithProbability, ProbabilityValue} from "../../utils/mathUtils";
import {
    GameInProgressKey,
    NewElementKey,
    PrevGridKey,
    PrevNewElementKey,
    PrevScoreKey,
    retrieveObject,
    storeObject,
    UndoAvailableKey
} from "../../utils/asyncStorageUtils";

const probabilities: ProbabilityValue[] = [
    {value: 1, probability: 12},//1
    {value: 2, probability: 6},//2
    {value: 3, probability: 1},//4
    {value: 4, probability: 2},//blocker
    {value: 5, probability: 1}//joker
];

interface Props {
    grid: GridElementState[];
    score: number;
    handleScoreChange: (newScore: number) => void;
    handleGridChange: (newGrid: GridElementState[]) => void;
}

export const useGameElement = ({grid, score, handleScoreChange, handleGridChange}: Props) => {
    const [prevGrid, setPrevGrid] = useState<GridElementState[]>(deepGridCopy(grid));
    const [prevNewElement, setPrevNewElement] = useState<GridElementState>(emptyElement(-1, -1));
    const [prevScore, setPrevScore] = useState<number>(0);
    const [undoAvailable, setUndoAvailable] = useState<boolean>(false);
    const [newElement, setNewElement] = useState<GridElementState>(newValueElement(-1, -1));
    const [isComponentInitiated, setIsComponentInitiated] = useState(false);


    useEffect(() => {
        initState();
    }, [])

    useEffect(() => {
        if (isComponentInitiated) {
            storeObject(PrevGridKey, prevGrid);
            storeObject(PrevNewElementKey, prevNewElement);
            storeObject(PrevScoreKey, prevScore);
            storeObject(NewElementKey, newElement);
            storeObject(UndoAvailableKey, undoAvailable);
        }
    }, [prevGrid, prevNewElement, prevScore, newElement, undoAvailable, isComponentInitiated])

    const initState = async () => {
        let isGameInProgress = await retrieveObject(GameInProgressKey) ?? false;

        if (isGameInProgress) {
            let retrievedPrevNewElement = await retrieveObject(PrevNewElementKey) ?? newValueElement(-1, -1);
            let retrievedPrevGrid = await retrieveObject(PrevGridKey) ?? deepGridCopy(grid);
            let retrievedPrevScore = await retrieveObject(PrevScoreKey) ?? 0;
            let retrievedNewElement = await retrieveObject(NewElementKey) ?? newValueElement(-1, -1);
            let retrievedUndoAvailable = await retrieveObject(UndoAvailableKey) ?? false;
            setPrevNewElement(retrievedPrevNewElement);
            setPrevGrid(retrievedPrevGrid);
            setPrevScore(retrievedPrevScore);
            setNewElement(retrievedNewElement);
            setUndoAvailable(retrievedUndoAvailable);
        }

        setIsComponentInitiated(true);
    }

    const getRandomNewElement = (): GridElementState => {
        let randomValue = getRandomWithProbability(probabilities);
        let element: GridElementState = newValueElement(-1, -1);

        switch (randomValue) {
            case 1:
                element = newValueElement(-1, -1);
                break;
            case 2:
                element = newValueElementWithValue(-1, -1, 2);
                break;
            case 3:
                element = newValueElementWithValue(-1, -1, 4);
                break;
            case 4:
                element = blockedElement(-1, -1);
                break;
            case 5:
                element = jokerElement(-1, -1);
                break;
        }

        return element;
    };

    const handleUndoPress = () => {
        if (undoAvailable) {
            setUndoAvailable(false);
            handleScoreChange(prevScore);
            setNewElement(prevNewElement);
            handleGridChange(prevGrid);
        }
    }

    const handleGridPress = (newGrid: GridElementState[], newPoints?: number) => {
        if (newPoints) {
            setPrevScore(score);
            handleScoreChange(score + newPoints);
        }

        setPrevGrid(grid);
        setPrevNewElement(newElement);
        setUndoAvailable(true);
        setNewElement(getRandomNewElement());
        handleGridChange(newGrid);
    };

    const handleHolderElementChanged = (holderElement: GridElementState) => {
        const updatedNewElement = holderElement.type === GridElementType.EMPTY ? getRandomNewElement() : holderElement;
        setNewElement(updatedNewElement);
    };

    return {
        handleUndoPress,
        undoAvailable,
        grid,
        newElement,
        handleGridPress,
        handleHolderElementChanged
    };
}