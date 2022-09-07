import { useEffect, useState } from 'react';
import {
  GridElementState,
  GridElementType,
  deepGridCopy,
  emptyElement,
  getRandomNewElement,
  ADS_ENABLED,
  showRewardAd, loadRewardAd, loadInterstitialAd, hasInternetConnection,
} from '../../../utils';

interface Props {
  grid: GridElementState[];
  score: number;
  handleScoreChange: (newScore: number) => void;
  handleGridChange: (newGrid: GridElementState[]) => void;
}

export const useGameElementLevel = ({
  grid, score, handleScoreChange, handleGridChange,
}: Props) => {
  const [prevGrid, setPrevGrid] = useState<GridElementState[]>(deepGridCopy(grid));
  const [prevNewElement, setPrevNewElement] = useState<GridElementState>(emptyElement(-1, -1));
  const [prevScore, setPrevScore] = useState<number>(0);
  const [undoAvailable, setUndoAvailable] = useState<boolean>(false);
  const [newElement, setNewElement] = useState<GridElementState>(getRandomNewElement());
  const [isEyePressed, setIsEyePressed] = useState<boolean>(false);
  const [undoLeft, setUndoLeft] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRewardAvailable, setIsRewardAvailable] = useState(false);

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    if (ADS_ENABLED) {
      loadRewardAd();
      loadInterstitialAd();
    }
  }, [prevGrid, isModalVisible]);

  const initState = async () => {
    const isInternetReachable = await hasInternetConnection();
    setIsRewardAvailable(isInternetReachable);
  };

  const handleUndoPress = () => {
    if (undoAvailable) {
      if (undoLeft > 0 || !ADS_ENABLED) {
        setUndoAvailable(false);
        handleScoreChange(prevScore);
        setNewElement(prevNewElement);
        handleGridChange(prevGrid);
        setUndoLeft(undoLeft - 1);
      } else {
        setIsModalVisible(true);
      }
    }
  };

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

  const handleBackToGamePress = () => {
    setIsModalVisible(false);
  };

  const handleShowAdsPress = async () => {
    await showRewardAd(() =>
      setUndoLeft(5), () =>
      setIsModalVisible(false));
  };

  return {
    handleUndoPress,
    undoAvailable,
    grid,
    newElement,
    handleGridPress,
    handleHolderElementChanged,
    isEyePressed,
    setIsEyePressed,
    undoLeft,
    isModalVisible,
    handleShowAdsPress,
    handleBackToGamePress,
    isRewardAvailable,
  };
};
