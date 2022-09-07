import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { GridElementState, vw } from '../../../utils';
import { NewTileElement } from '../NewTileElement';
import { GridElement } from '../GridElement';
import { UndoElement } from '../UndoElement';
import { ScoreElement } from '../ScoreElement';
import { useGameElementLevel } from './useGameElementLevel';
import { TileHolderElementLevel } from '../tileHolder/TileHolderElementLevel';
import { EyeIcon, ResetIcon } from '../../icons';
import { NoUndoLeftModal } from '../modals/NoUndoLeftModal';

interface MainGridProps {
  grid: GridElementState[];
  levelGrid: GridElementState[];
  score: number;
  handleScoreChange: (newScore: number) => void;
  handleGridChange: (newGrid: GridElementState[]) => void;
  handleGameReset: () => void;
}

export const GameElementLevel = ({
  grid, score, handleGridChange, handleScoreChange, levelGrid, handleGameReset,
}: MainGridProps) => {
  const {
    handleUndoPress,
    undoAvailable,
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
  } = useGameElementLevel({
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
        <TileHolderElementLevel
          newElement={newElement}
          onHolderElementChange={handleHolderElementChanged}
        />
        <ScoreElement score={score} />
        <UndoElement undoLeft={undoLeft} undoAvailable={undoAvailable} onUndoElementPress={handleUndoPress} />
      </View>
      <GridElement grid={grid} levelGrid={levelGrid} newElement={newElement} handleGridPress={handleGridPress} showLevelElements={isEyePressed} />
      <View style={styles.bottomPaneContainer}>
        <Pressable style={styles.iconContainer} onPress={handleGameReset}>
          <ResetIcon fill="black" />
        </Pressable>
        <NewTileElement newElement={newElement} />
        <Pressable
          style={styles.iconContainer}
          onPressIn={() =>
            setIsEyePressed(true)}
          onPressOut={() =>
            setIsEyePressed(false)}
        >
          <EyeIcon fill="black" />
        </Pressable>
      </View>
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

  bottomPaneContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: vw(80),
    marginTop: vw(1),
  },

  iconContainer: {
    display: 'flex',
    justifyContent: 'center',

    height: vw(12),
    width: vw(12),
  },
});
