import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import { ADS_ENABLED, vw } from '../../utils';
import { UndoIcon } from '../icons';

interface Props {
  undoAvailable: boolean;
  onUndoElementPress: () => void;
  undoLeft: number
}

export const UndoElement = ({ undoAvailable, onUndoElementPress, undoLeft }: Props) =>
  (
    <View style={styles.mainContainer}>
      {ADS_ENABLED
        && (<Text style={[styles.textElement, { color: undoAvailable ? 'black' : 'grey' }]}>{undoLeft}</Text>)}
      <Pressable style={styles.undoContainer} onPress={onUndoElementPress}>
        <UndoIcon fill={undoAvailable ? 'black' : 'grey'} />
      </Pressable>
    </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    position: 'relative',
  },
  textElement: {
    position: 'absolute',
    fontSize: vw(4),
    fontWeight: 'bold',
    right: 0,
    bottom: -vw(1),
  },
  undoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: vw(15),
    height: vw(10),
  },
});
