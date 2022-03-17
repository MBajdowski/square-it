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
import * as bgImg from '../../assets/bg.png';
import * as titleImg from '../../assets/title.png';
import * as logoImg from '../../assets/logo_color_bg.png';

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const MenuPage = ({ navigation }: Props) => {
  const [highScore, setHighScore] = useState(0);
  const [isResumeVisible, setIsResumeVisible] = useState(false);

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
    await removeCurrentGameData();
    navigation.navigate('GridPage');
  };

  return (
    <View style={styles.topContainer}>
      <BackgroundComponent img={bgImg} />
      <View style={styles.imageContainer}>
        <Image style={styles.titleImg} source={titleImg} />
        <Image style={styles.logoImg} source={logoImg} />
        <AnimatedTextElement text={`High Score: ${highScore}`} />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonElement text="New game" onPress={onNewGamePress} />
        {isResumeVisible && (
          <ButtonElement
            text="Resume"
            onPress={() => {
              navigation.navigate('GridPage');
            }}
          />
        )}
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
