import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { vw } from '../../utils';
import { UndoIcon } from '../icons';

interface Props {
  undoAvailable: boolean;
  onUndoElementPress: () => void;
}

export const UndoElement = ({ undoAvailable, onUndoElementPress }: Props) =>
  (
    <Pressable style={styles.undoContainer} onPress={onUndoElementPress}>
      <UndoIcon fill={undoAvailable ? 'black' : 'grey'} />
    </Pressable>
  );

const styles = StyleSheet.create({
  undoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: vw(15),
    height: vw(10),
  },
});
