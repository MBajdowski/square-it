import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { GameElement } from '../gameElement/GameElement';
import { EndGameModal } from '../modals/EndGameModal';
import { BackgroundComponent } from '../../common/BackgroundComponent';
import { EndLevelModal } from '../modals/EndLevelModal';
import { useGridPage } from './useGridPage';
import { useGridPageLevel } from './useGridPageLevel';
import * as bgImg from '../../../assets/bg.png';

interface Props {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

export const GridPage = ({ navigation, route }: Props) => {
  const levelId = route.params?.levelId;

  const {
    grid,
    gameCounter,
    score,
    levelGrid,
    handleModalClose,
    handleScoreChange,
    handleGridChange,
  } = levelId
    ? useGridPageLevel({ navigation, route })
    : useGridPage({ navigation });

  return (
    <View style={styles.topContainer}>
      <BackgroundComponent img={bgImg} />
      <EndGameModal grid={grid} onModalClose={handleModalClose} />
      <EndLevelModal grid={grid} levelGrid={levelGrid} levelId={levelId} onModalClose={handleModalClose} />
      <GameElement
        key={gameCounter}
        grid={grid}
        score={score}
        levelGrid={levelGrid}
        handleScoreChange={handleScoreChange}
        handleGridChange={handleGridChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
