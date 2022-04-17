import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GameElement } from '../gameElement/GameElement';
import { EndGameModal } from '../modals/EndGameModal';
import { BackgroundComponent } from '../../common/BackgroundComponent';
import { useGridPage } from './useGridPage';
import { BackButtonElement } from '../../common/BackButtonElement';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const GridPage = ({ navigation }: Props) => {
  const {
    grid,
    gameCounter,
    score,
    handleBackToMenu,
    handlePlayAgain,
    handleScoreChange,
    handleGridChange,
  } = useGridPage({ navigation });

  return (
    <View style={styles.topContainer}>
      <BackgroundComponent img={require('../../../assets/bg.png')} />
      <EndGameModal grid={grid} onBackToMenu={handleBackToMenu} onPlayAgain={handlePlayAgain} />
      <BackButtonElement navigation={navigation} />
      <GameElement
        key={gameCounter}
        grid={grid}
        score={score}
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
