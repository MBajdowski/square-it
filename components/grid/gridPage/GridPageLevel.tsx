import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { EndGameModal } from '../modals/EndGameModal';
import { BackgroundComponent } from '../../common/BackgroundComponent';
import { EndLevelModal } from '../modals/EndLevelModal';
import { useGridPageLevel } from './useGridPageLevel';
import { GameElementLevel } from '../gameElement/GameElementLevel';
import { BackButtonElement } from '../../common/BackButtonElement';

interface Props {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

export const GridPageLevel = ({ navigation, route }: Props) => {
  const levelId = route.params?.levelId;

  const {
    grid,
    gameCounter,
    score,
    levelGrid,
    handleSuccessModalClose,
    handleFailureModalClose,
    handleScoreChange,
    handleGridChange,
    handleGameReset,
  } = useGridPageLevel({ navigation, route });

  return (
    <View style={styles.topContainer}>
      <BackgroundComponent img={require('../../../assets/bg.png')} />
      <EndGameModal grid={grid} onModalClose={handleFailureModalClose} />
      <EndLevelModal grid={grid} levelGrid={levelGrid} levelId={levelId} onModalClose={handleSuccessModalClose} />
      <BackButtonElement navigation={navigation} />
      <GameElementLevel
        key={gameCounter}
        grid={grid}
        score={score}
        levelGrid={levelGrid}
        handleScoreChange={handleScoreChange}
        handleGridChange={handleGridChange}
        handleGameReset={handleGameReset}
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
