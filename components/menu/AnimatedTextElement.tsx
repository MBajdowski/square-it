import { Animated, StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { vw } from '../../utils/dimetionsUtils';
import InterpolationConfigType = Animated.InterpolationConfigType;

interface Props {
  text: string;
}

export const AnimatedTextElement = ({ text }: Props) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  const interpolationConfig: InterpolationConfigType = {
    inputRange: [0, 0.5, 1],
    outputRange: [1, 2, 1],
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <Animated.Text
      style={[styles.highScoreText,
        { transform: [{ scale: scaleValue.interpolate(interpolationConfig) }] }]}
    >
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  highScoreText: {
    fontWeight: 'bold',
    fontSize: vw(3),
    padding: vw(2),
  },
});
