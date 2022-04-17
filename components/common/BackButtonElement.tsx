import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { vw } from '../../utils';
import { BackIcon } from '../icons';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const BackButtonElement = ({ navigation }: Props) =>
  (
    <Pressable
      style={({ pressed }) =>
        [{ backgroundColor: pressed ? '#006680' : '#00a5cf' }, styles.button]}
      onPress={() =>
        navigation.goBack()}
    >
      <BackIcon fill="white" />
    </Pressable>
  );

const styles = StyleSheet.create({
  button: {
    display: 'flex',

    position: 'absolute',
    top: vw(5),
    left: vw(5),
    width: vw(12),
    height: vw(12),

    padding: vw(4),
    marginBottom: 0,
    borderRadius: vw(10),
    elevation: 2,

    zIndex: 99,
  },
});
