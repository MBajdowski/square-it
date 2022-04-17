import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  CurrentScoreKey,
  GameInProgressKey,
  GridKey,
  HighScoreKey,
  removeCurrentGameData,
  retrieveNumber,
  retrieveObject,
  storeNumber,
  storeObject,
  GridElementState,
  initGrid,
} from '../../../utils';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const useGridPage = ({ navigation }: Props) => {
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
    const isGameInProgress = await retrieveObject(GameInProgressKey) ?? false;
    if (isGameInProgress) {
      const retrievedScore = await retrieveObject(CurrentScoreKey);
      const retrievedGrid = await retrieveObject(GridKey);

      setScore(retrievedScore);
      setGrid(retrievedGrid);
    }
    setIsComponentInitiated(true);
    await storeObject(GameInProgressKey, true);
  };

  const storeGameState = async (gridToSave: GridElementState[], scoreToSave: number) => {
    await storeObject(GridKey, gridToSave);
    await storeObject(CurrentScoreKey, scoreToSave);
  };

  const handleModalClose = async (navigateTo: string) => {
    await storeObject(GameInProgressKey, false);
    await removeCurrentGameData();

    const retrievedHighScore = await retrieveNumber(HighScoreKey);
    if (score > retrievedHighScore) {
      await storeNumber(HighScoreKey, score);
    }
    setGameCounter(gameCounter + 1);
    setGrid(initGrid);
    setScore(0);
    navigation.navigate(navigateTo);
  };

  const handleBackToMenu = async () => {
    await handleModalClose('MenuPage');
  };

  const handlePlayAgain = async () => {
    await handleModalClose('GridPage');
  };

  const handleGridChange = (newGrid: GridElementState[]) => {
    setGrid(newGrid);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  return {
    grid,
    gameCounter,
    score,
    handleBackToMenu,
    handlePlayAgain,
    handleScoreChange,
    handleGridChange,
  };
};
