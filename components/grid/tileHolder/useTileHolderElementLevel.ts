import { useState } from 'react';
import { GridElementState, emptyElement } from '../../../utils';

interface HolderElementProps {
  newElement: GridElementState;
  onHolderElementChange: (holderElement: GridElementState) => void;
}

export const useTileHolderElementLevel = ({ newElement, onHolderElementChange }: HolderElementProps) => {
  const [holderElement, setHolderElement] = useState<GridElementState>(emptyElement(-1, -1));

  const handleHolderPress = (currentElement: GridElementState) => {
    setHolderElement(newElement);
    onHolderElementChange(currentElement);
  };

  return {
    holderElement,
    handleHolderPress,
  };
};
