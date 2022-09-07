import React, { useEffect, useState } from 'react';
import {
  Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useIsFocused } from '@react-navigation/native';
import { TileElement } from '../grid/TileElement';
import { BackgroundComponent } from '../common/BackgroundComponent';
import { CheckIcon } from '../icons';
import data from './levels.json';
import {
  CompletedLevelsKey,
  retrieveObject,
  GameLevel,
  newValueElementWithValue,
  vw,
  retrieveNumber,
  LevelActionCounterKey,
  storeNumber, showInterstitialAd, ADS_ENABLED, hasInternetConnection,
} from '../../utils';
import { BackButtonElement } from '../common/BackButtonElement';

const noInRow = 5;

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const LevelsPage = ({ navigation }: Props) => {
  const levels: GameLevel[] = JSON.parse(JSON.stringify(data));
  const noOfRows = Math.ceil(levels.length / noInRow);
  const [completedLevels, setCompletedLevels] = useState<Array<number>>([]);

  const isPageVisible = useIsFocused();

  useEffect(() => {
    initCompletedLevels();
  }, [isPageVisible]);

  const initCompletedLevels = async () => {
    const retrievedCompletedLevels = await retrieveObject(CompletedLevelsKey) ?? [];
    setCompletedLevels(retrievedCompletedLevels);
  };

  const onLevelClick = async (id: number) => {
    const currentLevelActionCount = await retrieveNumber(LevelActionCounterKey) ?? 0;
    const isInternetReachable = await hasInternetConnection();

    if (ADS_ENABLED && currentLevelActionCount > 5 && isInternetReachable) {
      showInterstitialAd(() =>
        addLevelActionAndNavigate(id, 0));
    } else {
      addLevelActionAndNavigate(id, currentLevelActionCount + 1);
    }
  };

  const addLevelActionAndNavigate = async (id: number, newLevelActionCount: number) => {
    storeNumber(LevelActionCounterKey, newLevelActionCount);
    navigation.navigate('GridPageLevel', { levelId: id });
  };

  return (
    <View style={styles.mainContainer}>
      <BackgroundComponent img={require('../../assets/bg.png')} />
      <BackButtonElement navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Game Levels</Text>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[...Array(noOfRows).keys()].map((n) =>
            (
              <View key={`${n}levelRow`} style={styles.rowContainer}>
                {levels.slice(n * noInRow, n * noInRow + 5).map((m) =>
                  (
                    <View key={`${m.id}levelElement`} style={styles.levelContainer}>
                      <TileElement
                        element={newValueElementWithValue(-1, -1, m.id)}
                        linearColor
                        handlePress={() =>
                          onLevelClick(m.id)}
                      />
                      {completedLevels.includes(m.id) && (
                        <Pressable
                          onPress={() =>
                            onLevelClick(m.id)}
                          style={styles.tickContainer}
                        >
                          <CheckIcon fill="#00aa13" />
                        </Pressable>
                      )}
                    </View>
                  ))}
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    display: 'flex',
  },
  titleContainer: {
    flex: 1,

    display: 'flex',
    justifyContent: 'center',

    marginHorizontal: vw(5),
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vw(9),
  },
  scrollContainer: {
    flex: 5,

    display: 'flex',
    justifyContent: 'center',

    marginHorizontal: vw(5),
    backgroundColor: '#fff',
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
    padding: vw(1),
  },
  rowContainer: {
    flex: 1,

    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  levelContainer: {
    position: 'relative',
    height: vw(17),
    width: vw(17),
  },
  tickContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: vw(7),
    height: vw(7),
  },
});
