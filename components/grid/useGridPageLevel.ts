import {useState} from "react";
import {GameLevel, GridElementState} from "../../utils/types";
import {initGrid} from "../../utils/gridStateUtils";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RouteProp} from "@react-navigation/native";
import data from "../levels/levels.json";

interface Props {
    navigation: NativeStackNavigationProp<any>;
    route: RouteProp<any>;
}

export const useGridPageLevel = ({navigation, route}: Props) => {
    const [gameCounter, setGameCounter] = useState<number>(0);
    const [grid, setGrid] = useState<GridElementState[]>(initGrid);
    const [score, setScore] = useState<number>(0);

    const levelId = route.params?.levelId;

    const levelGrid: GridElementState[] = levelId ?
        (JSON.parse(JSON.stringify(data)) as GameLevel[]).filter(l => l.id === levelId)[0].levelGrid :
        [];

    const handleModalClose = async (navigateTo: string) => {
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