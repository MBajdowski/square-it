import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TileElement } from '../TileElement';
import { GridElementState, vw } from '../../../utils';
import { useTileHolderElement } from './useTileHolderElement';
import { useTileHolderElementLevel } from './useTileHolderElementLevel';

interface HolderElementProps {
  newElement: GridElementState;
  onHolderElementChange: (holderElement: GridElementState) => void;
  isLevelMode: boolean;
}

const styles = StyleSheet.create({
  elementHolderContainer: {
    width: vw(15),
    height: vw(15),
    padding: vw(0.5),
    backgroundColor: 'lightgrey',
  },
});

export const TileHolderElement = ({ newElement, onHolderElementChange, isLevelMode }: HolderElementProps) => {
  const {
    holderElement,
    handleHolderPress,
  } = isLevelMode
    ? useTileHolderElementLevel({ newElement, onHolderElementChange })
    : useTileHolderElement({ newElement, onHolderElementChange });

  return (
    <View style={styles.elementHolderContainer}>
      <TileElement element={holderElement} handlePress={handleHolderPress} />
    </View>
  );
};
