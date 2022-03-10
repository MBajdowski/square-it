import React from 'react';
import {
  Pressable, ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { vw } from '../../utils/dimetionsUtils';
import { TileElement } from '../grid/TileElement';
import { newValueElementWithValue } from '../../utils/gridElementStateUtils';
import { BackgroundComponent } from '../common/BackgroundComponent';
import { ButtonElement } from '../common/ButtonElement';
import { CheckIcon } from '../icons/CheckIcon';
import data from './levels.json';
import { GameLevel } from '../../utils/types';

const noInRow = 5;

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const LevelsPage = ({ navigation }: Props) => {
  const levels: GameLevel[] = JSON.parse(JSON.stringify(data));
  const noOfRows = Math.ceil(levels.length / noInRow);

  return (
    <View style={styles.mainContainer}>
      <BackgroundComponent img={require('../../assets/bg.png')} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Game Levels</Text>
        <ButtonElement
          text="<"
          onPress={() => {
            navigation.goBack();
          }}
          buttonStyle={styles.button}
        />
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
                        handlePress={() => {
                          navigation.navigate('GridPage', { levelId: m.id });
                        }}
                      />
                      {(m.id < 3) && (
                        <Pressable
                          onPress={() => {
                            navigation.navigate('GridPage', { levelId: m.id });
                          }}
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
  button: {
    position: 'absolute',
    width: vw(12),
    marginBottom: 0,
    paddingTop: vw(2),
    paddingBottom: vw(3),
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
