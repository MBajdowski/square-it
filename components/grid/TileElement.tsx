import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Pressable, StyleSheet, Text, View,
} from 'react-native';
import { GridElementState, GridElementType, vw } from '../../utils';
import { PlusIcon } from '../icons';

interface Props {
  element: GridElementState;
  levelElement?: GridElementState;
  handlePress: (element: GridElementState) => void;
  showLevelElements?: boolean;
  linearColor?: boolean;
}

const calculateLogHslValue = (element: GridElementState) => {
  const hslValue = (160 + Math.log2(element.value) * 15) % 360;
  return `hsl(${hslValue}, 80%, 90%)`;
};

const calculateLinearHslValue = (element: GridElementState) => {
  const hslValue = (160 + element.value * 5) % 360;
  return `hsl(${hslValue}, 80%, 90%)`;
};

const calculateFontSize = (element: GridElementState) => {
  if (element.value < 999) {
    return vw(5);
  }
  if (element.value < 9999) {
    return vw(4);
  }
  return vw(3);
};

export const TileElement = ({
  element, handlePress, levelElement, showLevelElements, linearColor,
}: Props) => {
  const [lastChangedValue, setLastChangedValue] = useState<GridElementState>({ ...element });
  const opacity = useRef(new Animated.Value(1));

  const isElementLevelTheSameAsElement = () => {
    if (levelElement) {
      return element.value === levelElement.value && element.type === levelElement.type;
    }
    return false;
  };

  const isElementLevelNotTheSameAsElement = () => {
    if (levelElement && element.type !== GridElementType.EMPTY) {
      return element.value !== levelElement.value || element.type !== levelElement.type;
    }
    return false;
  };

  useEffect(() => {
    if (element.type === GridElementType.EMPTY && lastChangedValue.type !== element.type) {
      Animated.timing(opacity.current, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        opacity.current = new Animated.Value(1);
        setLastChangedValue({ ...element });
      });
    } else {
      setLastChangedValue({ ...element });
    }
  }, [element]);

  return (
    <Pressable
      style={styles.gridContainer}
      onPress={() =>
        handlePress(lastChangedValue)}
    >
      <View style={styles.middleContainer}>
        {
          lastChangedValue.type === GridElementType.EMPTY
            && <View style={styles.emptyContainer} />
        }

        {
          levelElement
            && (
            <View style={[
              styles.levelContainer,
              showLevelElements ? styles.onTop : styles.onBottom,
              isElementLevelTheSameAsElement() && { backgroundColor: '#a2ff93' },
              isElementLevelNotTheSameAsElement() && { backgroundColor: '#ff9393' },
            ]}
            >
              <Text style={styles.levelText}>{levelElement.value}</Text>
            </View>
            )
        }

        {lastChangedValue.type === GridElementType.VALUE
            && (
            <Animated.View
              style={[
                styles.valueContainer,
                lastChangedValue.bonus ? styles.bonusBorder : styles.normalBorder,
                {
                  opacity: opacity.current,
                  backgroundColor: linearColor
                    ? calculateLinearHslValue(lastChangedValue) : calculateLogHslValue(lastChangedValue),
                }]}
            >
              <Text style={[styles.valueTextContainer, { fontSize: calculateFontSize(lastChangedValue) }]}>
                {lastChangedValue.value}
              </Text>
            </Animated.View>
            )}

        {lastChangedValue.type === GridElementType.BLOCKED
            && (
            <Animated.View
              style={[
                lastChangedValue.value === 1 ? styles.blockedContainer1 : styles.blockedContainer2,
                { opacity: opacity.current }]}
            />
            )}

        {lastChangedValue.type === GridElementType.JOKER
            && (
            <View style={[styles.jokerContainer, styles.normalBorder]}>
              <PlusIcon height={vw(7)} width={vw(7)} fill="black" />
            </View>
            )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',

    padding: vw(0.5),
  },

  middleContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',

    padding: vw(1),
    backgroundColor: 'white',

  },

  valueContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: vw(0.7),
  },

  valueTextContainer: {
    fontWeight: 'bold',
  },

  normalBorder: {
    borderColor: '#3b3b3b',
  },

  bonusBorder: {
    borderColor: '#da9100',
  },

  emptyContainer: {
    flex: 1,

    backgroundColor: 'white',
  },

  levelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.85,
  },

  onBottom: {
    zIndex: 0,
  },

  onTop: {
    zIndex: 1,
  },

  levelText: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: vw(7),
    textAlign: 'center',
  },

  blockedContainer1: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#a0a0a0',
  },

  blockedContainer2: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#343434',
  },

  jokerContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#7acee2',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: vw(0.7),
  },
});
