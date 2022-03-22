import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import data from '../../levels/levels.json';
import {
  CompletedLevelsKey,
  retrieveObject,
  storeObject,
  GameLevel,
  GridElementState,
  initGrid,
} from '../../../utils';

interface Props {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

export const useGridPageLevel = ({ navigation, route }: Props) => {
  const [gameCounter, setGameCounter] = useState<number>(0);
  const [grid, setGrid] = useState<GridElementState[]>(initGrid);
  const [score, setScore] = useState<number>(0);

  const levelId = route.params?.levelId;

  const levelGrid: GridElementState[] = levelId
    ? (JSON.parse(JSON.stringify(data)) as GameLevel[]).filter((l) =>
      l.id === levelId)[0].levelGrid
    : [];

  const handleSuccessModalClose = async (navigateTo: string) => {
    const retrievedCompletedLevels = await retrieveObject(CompletedLevelsKey) as Array<number> ?? [];
    if (!retrievedCompletedLevels.includes(levelId)) {
      retrievedCompletedLevels.push(levelId);
      await storeObject(CompletedLevelsKey, retrievedCompletedLevels);
    }

    setGameCounter(gameCounter + 1);
    setGrid(initGrid);
    setScore(0);
    navigation.navigate(navigateTo);
  };

  const handleFailureModalClose = (navigateTo: string) => {
    // TODO: To źle nawiguje (dla play again powinno iść do leveli a nie na grida)
    setGameCounter(gameCounter + 1);
    setGrid(initGrid);
    setScore(0);
    navigation.navigate(navigateTo);
  };

  const handleGridChange = (newGrid: GridElementState[]) => {
    setGrid(newGrid);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  const handleGameReset = () => {
    setGameCounter(gameCounter + 1);
    setGrid(initGrid);
    setScore(0);
  };

  return {
    grid,
    gameCounter,
    score,
    levelGrid,
    handleSuccessModalClose,
    handleFailureModalClose,
    handleScoreChange,
    handleGridChange,
    handleGameReset,
  };
};
