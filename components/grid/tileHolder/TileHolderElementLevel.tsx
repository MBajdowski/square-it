import { StyleSheet, View } from 'react-native';
import React from 'react';
import { TileElement } from '../TileElement';
import { GridElementState, vw } from '../../../utils';
import { useTileHolderElementLevel } from './useTileHolderElementLevel';

interface HolderElementProps {
  newElement: GridElementState;
  onHolderElementChange: (holderElement: GridElementState) => void;
}

const styles = StyleSheet.create({
  elementHolderContainer: {
    width: vw(15),
    height: vw(15),
    padding: vw(0.5),
    backgroundColor: 'lightgrey',
  },
});

export const TileHolderElementLevel = ({ newElement, onHolderElementChange }: HolderElementProps) => {
  const {
    holderElement,
    handleHolderPress,
  } = useTileHolderElementLevel({ newElement, onHolderElementChange });

  return (
    <View style={styles.elementHolderContainer}>
      <TileElement element={holderElement} handlePress={handleHolderPress} />
    </View>
  );
};
