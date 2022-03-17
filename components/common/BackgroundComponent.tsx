import React from 'react';
import {
  Image, ImageSourcePropType, StyleSheet, View,
} from 'react-native';
import { noOfRows, vh, vw } from '../../utils';

interface Props {
  noInRow?: number;
  img: ImageSourcePropType;
}

export const BackgroundComponent = ({ noInRow = 12, img }: Props) => {
  const size = vw(100 / noInRow);
  const rows = noOfRows(size);

  return (
    <View style={styles.mainComponent}>
      {[...Array(rows).keys()].map((r) =>
        (
          <View key={`bgRow${r}`} style={styles.row}>
            {[...Array(noInRow).keys()].map((c) =>
              (<Image key={`bgCol${c}`} style={[styles.image]} source={img} />))}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainComponent: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: vw(100),
    height: vh(100),
    zIndex: -1,
  },
  row: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    opacity: 0.5,
  },
});
