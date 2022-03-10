import React, { useEffect, useState } from 'react';
import {
  Modal, StyleSheet, Text, View,
} from 'react-native';
import { GridElementState } from '../../utils/types';
import { ButtonElement } from '../common/ButtonElement';
import { vw } from '../../utils/dimetionsUtils';
import { CheckIcon } from '../icons/CheckIcon';

interface MyProps {
  grid: GridElementState[];
  levelGrid: GridElementState[];
  onModalClose: (navigateTo: string) => void;
}

const isElementTheSame = (element1: GridElementState, element2: GridElementState) =>
  element1.x === element2.x
    && element1.y === element2.y
    && element1.type === element2.type
    && element1.value === element2.value;

const isSubset = (superset: GridElementState[], subset: GridElementState[]) => {
  let isElementMissing = false;
  if (subset.length > superset.length) {
    return false;
  }
  subset.forEach((element) => {
    if (superset.filter((each) =>
      isElementTheSame(each, element)).length === 0) {
      isElementMissing = true;
      // return false;
    }
  });
  return !isElementMissing;
};

export const EndLevelModal = ({ grid, levelGrid, onModalClose }: MyProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (levelGrid.length > 0 && isSubset(grid, levelGrid)) {
      setIsVisible(true);
    }
  }, [grid]);

  const handleModalCloseNavigateToLevel = () => {
    setIsVisible(false);
    onModalClose('LevelsPage');
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={handleModalCloseNavigateToLevel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Level completed!</Text>
          <View style={styles.tickContainer}>
            <CheckIcon fill="#00aa13" />
          </View>
          <ButtonElement text="Level selection" onPress={handleModalCloseNavigateToLevel} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: vw(5),
    backgroundColor: 'white',
    borderRadius: vw(5),
    padding: vw(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: vw(2),
      height: vw(4),
    },
    shadowOpacity: 0.25,
    shadowRadius: vw(1),
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vw(5),
  },
  tickContainer: {
    width: vw(20),
    height: vw(20),
    margin: vw(5),
  },
});
