import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { vw } from '../../utils/dimetionsUtils';
import { UndoIcon } from '../icons/UndoIcon';

interface Props {
  undoAvailable: boolean;
  onUndoElementPress: () => void;
}

export const UndoElement = ({ undoAvailable, onUndoElementPress }: Props) =>
  (
    <Pressable style={styles.undoContainer} onPress={onUndoElementPress}>
      <UndoIcon height={vw(8)} fill={undoAvailable ? 'black' : 'grey'} />
    </Pressable>
  );

const styles = StyleSheet.create({
  undoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: vw(1),
    width: vw(15),
  },
  svg: {
    height: vw(8),
    width: vw(8),
  },
});
