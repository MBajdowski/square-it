import { useEffect, useState } from 'react';
import { GridElementState, GridElementType } from '../../../utils/types';
import { deepGridCopy } from '../../../utils/gridStateUtils';
import { emptyElement, getRandomNewElement, newValueElement } from '../../../utils/gridElementStateUtils';
import {
  GameInProgressKey,
  NewElementKey,
  PrevGridKey,
  PrevNewElementKey,
  PrevScoreKey,
  retrieveObject,
  storeObject,
  UndoAvailableKey,
} from '../../../utils/asyncStorageUtils';

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
    }
  }, [prevGrid, prevNewElement, prevScore, newElement, undoAvailable, isComponentInitiated]);

  const initState = async () => {
    const isGameInProgress = await retrieveObject(GameInProgressKey) ?? false;

    if (isGameInProgress) {
      const retrievedPrevNewElement = await retrieveObject(PrevNewElementKey) ?? newValueElement(-1, -1);
      const retrievedPrevGrid = await retrieveObject(PrevGridKey) ?? deepGridCopy(grid);
      const retrievedPrevScore = await retrieveObject(PrevScoreKey) ?? 0;
      const retrievedNewElement = await retrieveObject(NewElementKey) ?? newValueElement(-1, -1);
      const retrievedUndoAvailable = await retrieveObject(UndoAvailableKey) ?? false;
      setPrevNewElement(retrievedPrevNewElement);
      setPrevGrid(retrievedPrevGrid);
      setPrevScore(retrievedPrevScore);
      setNewElement(retrievedNewElement);
      setUndoAvailable(retrievedUndoAvailable);
    }

    setIsComponentInitiated(true);
  };

  const handleUndoPress = () => {
    if (undoAvailable) {
      setUndoAvailable(false);
      handleScoreChange(prevScore);
      setNewElement(prevNewElement);
      handleGridChange(prevGrid);
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

  return {
    handleUndoPress,
    undoAvailable,
    grid,
    newElement,
    handleGridPress,
    handleHolderElementChanged,
  };
};
