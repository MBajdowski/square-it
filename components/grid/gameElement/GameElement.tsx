import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GridElementState, vw } from '../../../utils';
import { useGameElement } from './useGameElement';
import { NewTileElement } from '../NewTileElement';
import { GridElement } from '../GridElement';
import { TileHolderElement } from '../tileHolder/TileHolderElement';
import { UndoElement } from '../UndoElement';
import { ScoreElement } from '../ScoreElement';
import { NoUndoLeftModal } from '../modals/NoUndoLeftModal';

interface MainGridProps {
  grid: GridElementState[];
  score: number;
  handleScoreChange: (newScore: number) => void;
  handleGridChange: (newGrid: GridElementState[]) => void;
}

export const GameElement = ({
  grid, score, handleGridChange, handleScoreChange,
}: MainGridProps) => {
  const {
    handleUndoPress,
    undoAvailable,
    undoLeft,
    newElement,
    handleGridPress,
    handleHolderElementChanged,
    isModalVisible,
    handleBackToGamePress,
    handleShowAdsPress,
    isRewardAvailable,
  } = useGameElement({
    grid, score, handleScoreChange, handleGridChange,
  });

  return (
    <View style={styles.topContainer}>
      <NoUndoLeftModal
        isVisible={isModalVisible}
        onShowAdsPress={handleShowAdsPress}
        onBackToGamePress={handleBackToGamePress}
        isRewardAvailable={isRewardAvailable}
      />
      <View style={styles.topPaneContainer}>
        <TileHolderElement
          newElement={newElement}
          onHolderElementChange={handleHolderElementChanged}
        />
        <ScoreElement score={score} />
        <UndoElement undoAvailable={undoAvailable} undoLeft={undoLeft} onUndoElementPress={handleUndoPress} />
      </View>
      <GridElement grid={grid} levelGrid={[]} newElement={newElement} handleGridPress={handleGridPress} />
      <NewTileElement newElement={newElement} />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  row: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'row',
  },

  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',

    height: vw(80),
    width: vw(80),
    backgroundColor: '#a4a4a4',
    padding: vw(0.5),
  },

  topPaneContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: vw(80),
    marginBottom: vw(1),
  },
});
