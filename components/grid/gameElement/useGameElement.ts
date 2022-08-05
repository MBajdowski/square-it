import { useEffect, useState } from 'react';
import {
  GameInProgressKey,
  NewElementKey,
  PrevGridKey,
  PrevNewElementKey,
  PrevScoreKey,
  retrieveObject,
  storeObject,
  UndoAvailableKey,
  GridElementState,
  GridElementType,
  deepGridCopy,
  emptyElement,
  getRandomNewElement,
  newValueElement, storeNumber, UndoLeftKey,
} from '../../../utils';

interface Props {
  grid: GridElementState[];
  score: number;
  handleScoreChange: (newScore: number) => void;
  handleGridChange: (newGrid: GridElementState[]) => void;
}

export const useGameElement = ({
  grid, score, handleScoreChange, handleGridChange,
}: Props) => {
  const [prevGrid, setPrevGrid] = useState<GridElementState[]>(deepGridCopy(grid));
  const [prevNewElement, setPrevNewElement] = useState<GridElementState>(emptyElement(-1, -1));
  const [prevScore, setPrevScore] = useState<number>(0);
  const [undoAvailable, setUndoAvailable] = useState<boolean>(false);
  const [newElement, setNewElement] = useState<GridElementState>(getRandomNewElement());
  const [isComponentInitiated, setIsComponentInitiated] = useState(false);
  const [undoLeft, setUndoLeft] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    if (isComponentInitiated) {
      storeObject(PrevGridKey, prevGrid);
      storeObject(PrevNewElementKey, prevNewElement);
      storeObject(PrevScoreKey, prevScore);
      storeObject(NewElementKey, newElement);
      storeObject(UndoAvailableKey, undoAvailable);
      storeNumber(UndoLeftKey, undoLeft);
    }
  }, [prevGrid, prevNewElement, prevScore, newElement, undoAvailable, isComponentInitiated, undoLeft]);

  const initState = async () => {
    const isGameInProgress = await retrieveObject(GameInProgressKey) ?? false;

    if (isGameInProgress) {
      const retrievedPrevNewElement = await retrieveObject(PrevNewElementKey) ?? newValueElement(-1, -1);
      const retrievedPrevGrid = await retrieveObject(PrevGridKey) ?? deepGridCopy(grid);
      const retrievedPrevScore = await retrieveObject(PrevScoreKey) ?? 0;
      const retrievedNewElement = await retrieveObject(NewElementKey) ?? newValueElement(-1, -1);
      const retrievedUndoAvailable = await retrieveObject(UndoAvailableKey) ?? false;
      const retrievedUndoLeft = await retrieveObject(UndoLeftKey) ?? 5;
      setPrevNewElement(retrievedPrevNewElement);
      setPrevGrid(retrievedPrevGrid);
      setPrevScore(retrievedPrevScore);
      setNewElement(retrievedNewElement);
      setUndoAvailable(retrievedUndoAvailable);
      setUndoLeft(retrievedUndoLeft);
    }

    setIsComponentInitiated(true);
  };

  const handleUndoPress = () => {
    if (undoAvailable) {
      if (undoLeft > 0) {
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

  const handleShowAdsPress = () => {
    // TODO: Dodać reklamy tutaj
    setUndoLeft(5);
    setIsModalVisible(false);
  };

  return {
    handleUndoPress,
    undoAvailable,
    undoLeft,
    grid,
    newElement,
    handleGridPress,
    handleHolderElementChanged,
    isModalVisible,
    handleBackToGamePress,
    handleShowAdsPress,
  };
};
