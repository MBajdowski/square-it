import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { vw } from '../../utils';

interface Props {
  score: number;
}

export const ScoreElement = ({ score }: Props) =>
  (
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreTextContainer}>{score}</Text>
    </View>
  );

const styles = StyleSheet.create({
  scoreContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreTextContainer: {
    fontWeight: 'bold',
    fontSize: vw(8),
  },
});
