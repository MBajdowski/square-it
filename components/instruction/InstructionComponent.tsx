import React from 'react';
import {
  Image, ImageSourcePropType, StyleSheet, Text, View,
} from 'react-native';
import { vw } from '../../utils';

interface Props {
  text: string;
  images: ImageSourcePropType[];
}

export const InstructionComponent = ({ text, images }: Props) =>
  (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.imageContainer}>
        {images.map((img, index) =>
          <Image style={styles.image} key={`instructionImg${index.toString()}`} source={img} />)}
      </View>
    </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    padding: vw(3),
    paddingBottom: 0,
    display: 'flex',
  },
  text: {
    fontSize: vw(5),
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    marginTop: vw(2),
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    height: vw(45),
    borderRadius: vw(5),
  },
});
