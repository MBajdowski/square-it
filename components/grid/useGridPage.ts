import {useEffect, useState} from "react";
import {GridElementState} from "../../utils/types";
import {initGrid} from "../../utils/gridStateUtils";
import {
    CurrentScoreKey,
    GameInProgressKey,
    GridKey,
    HighScoreKey,
    removeCurrentGameData,
    retrieveNumber,
    retrieveObject,
    storeNumber,
    storeObject
} from "../../utils/asyncStorageUtils";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface Props {
    navigation: NativeStackNavigationProp<any>;
}

export const useGridPage = ({navigation}: Props) => {
    const [gameCounter, setGameCounter] = useState<number>(0);
    const [grid, setGrid] = useState<GridElementState[]>(initGrid);
    const [score, setScore] = useState<number>(0);
    const [isComponentInitiated, setIsComponentInitiated] = useState(false);

    const levelGrid: GridElementState[] = [];

    useEffect(() => {
        initGridAndScore();
    }, []);

    useEffect(() => {
        if (isComponentInitiated) {
            storeGameState(grid, score);
        }
    }, [grid, score, isComponentInitiated]);

    const initGridAndScore = async () => {
        let isGameInProgress = await retrieveObject(GameInProgressKey) ?? false;
        if (isGameInProgress) {
            let score = await retrieveObject(CurrentScoreKey);
            let grid = await retrieveObject(GridKey);

            setScore(score);
            setGrid(grid);
        }
        setIsComponentInitiated(true);
        storeObject(GameInProgressKey, true);
    }

    const storeGameState = async (grid: GridElementState[], score: number) => {
        await storeObject(GridKey, grid);
        await storeObject(CurrentScoreKey, score);
    };

    const handleModalClose = async (navigateTo: string) => {
        storeObject(GameInProgressKey, false);
        removeCurrentGameData();

        const retrievedHighScore = await retrieveNumber(HighScoreKey);
        if (score > retrievedHighScore) {
            storeNumber(HighScoreKey, score);
        }
        setGameCounter(gameCounter + 1);
        setGrid(initGrid)
        setScore(0);
        navigation.navigate(navigateTo);
    };

    const handleGridChange = (newGrid: GridElementState[]) => {
        setGrid(newGrid);
    }

    const handleScoreChange = (newScore: number) => {
        setScore(newScore);
    }

    return {
        grid,
        gameCounter,
        score,
        levelGrid,
        handleModalClose,
        handleScoreChange,
        handleGridChange
    }
}