import React, {useEffect, useState} from "react";
import {GameElement} from "./GameElement";
import {StyleSheet, View} from "react-native";
import {EndGameModal} from "./EndGameModal";
import {GridElementState} from "../../utils/types";
import {initGrid} from "../../utils/gridStateUtils";
import {
    CurrentScoreKey,
    GameInProgressKey,
    GridKey,
    HighScoreKey,
    removeAllKeys,
    retrieveNumber,
    retrieveObject,
    storeNumber,
    storeObject
} from "../../utils/asyncStorageUtils";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {BackgroundComponent} from "../common/BackgroundComponent";

interface Props {
    navigation: NativeStackNavigationProp<any>
}

export const GridPage = ({navigation}: Props) => {

    const [gameCounter, setGameCounter] = useState<number>(0);
    const [grid, setGrid] = useState<GridElementState[]>(initGrid);
    const [score, setScore] = useState<number>(0);
    const [isComponentInitiated, setIsComponentInitiated] = useState(false);

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

    const handleModalClose = async () => {
        storeObject(GameInProgressKey, false);
        removeAllKeys();

        const retrievedHighScore = await retrieveNumber(HighScoreKey);
        if (score > retrievedHighScore) {
            storeNumber(HighScoreKey, score);
        }
        setGameCounter(gameCounter + 1);
        setGrid(initGrid)
        setScore(0);
        navigation.navigate('MenuPage');
    };

    const handleGridChange = (newGrid: GridElementState[]) => {
        setGrid(newGrid);
    }

    const handleScoreChange = (newScore: number) => {
        setScore(newScore);
    }

    return (
        <View style={styles.topContainer}>
            <BackgroundComponent img={require('../../assets/bg.png')}/>
            <EndGameModal grid={grid} onModalClose={handleModalClose}/>
            <GameElement key={gameCounter} grid={grid} score={score} handleScoreChange={handleScoreChange}
                         handleGridChange={handleGridChange}/>
        </View>
    );
};


const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#fff'
    }
});