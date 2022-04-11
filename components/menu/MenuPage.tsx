import { Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { AnimatedTextElement } from './AnimatedTextElement';
import { ButtonElement } from '../common/ButtonElement';
import {
  GameInProgressKey,
  HighScoreKey,
  removeCurrentGameData,
  retrieveNumber,
  retrieveObject,
  vw,
} from '../../utils';
import { BackgroundComponent } from '../common/BackgroundComponent';
import { NewGameModal } from './NewGameModal';

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const MenuPage = ({ navigation }: Props) => {
  const [highScore, setHighScore] = useState(0);
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isPageVisible = useIsFocused();

  const setRetrievedScore = useCallback(async () => {
    const retrievedHighScore = await retrieveNumber(HighScoreKey);
    setHighScore(retrievedHighScore);
  }, []);

  const initState = async () => {
    const isResumeVisibleRetrieved = await retrieveObject(GameInProgressKey);

    setIsResumeVisible(isResumeVisibleRetrieved);
  };

  useEffect(() => {
    setRetrievedScore();
    initState();
  }, [isPageVisible, setRetrievedScore]);

  const onNewGamePress = async () => {
    if (isResumeVisible) {
      setIsModalVisible(true);
    } else {
      await removeCurrentGameData();
      navigation.navigate('GridPage');
    }
  };

  const onModalNewGamePress = async () => {
    await removeCurrentGameData();
    setIsModalVisible(false);
    navigation.navigate('GridPage');
  };

  const onModalBackToMenuPress = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.topContainer}>
      <BackgroundComponent img={require('../../assets/bg.png')} />
      <NewGameModal
        isVisible={isModalVisible}
        onNewGamePress={onModalNewGamePress}
        onBackToMenuPress={onModalBackToMenuPress}
      />
      <View style={styles.imageContainer}>
        <Image style={styles.titleImg} source={require('../../assets/title.png')} />
        <Image style={styles.logoImg} source={require('../../assets/logo_color_bg.png')} />
        <AnimatedTextElement text={`High Score: ${highScore}`} />
      </View>
      <View style={styles.buttonsContainer}>
        {isResumeVisible && (
        <ButtonElement
          text="Resume"
          onPress={() => {
            navigation.navigate('GridPage');
          }}
        />
        )}
        <ButtonElement text="New game" onPress={onNewGamePress} />
        <ButtonElement
          text="Levels"
          onPress={() => {
            navigation.navigate('LevelsPage');
          }}
        />
        <ButtonElement
          text="How to play"
          onPress={() => {
            navigation.navigate('BasicInstructionPage');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: vw(50),
    height: vw(50),
    backgroundColor: '#fff',
  },
  titleImg: {
    height: vw(20),
    width: vw(70),
    resizeMode: 'center',
  },
});
