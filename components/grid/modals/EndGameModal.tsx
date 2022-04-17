import React, { useEffect, useState } from 'react';
import {
  Modal, StyleSheet, Text, View,
} from 'react-native';
import { GridElementState, GridElementType, vw } from '../../../utils';
import { ButtonElement } from '../../common/ButtonElement';

interface MyProps {
  grid: GridElementState[];
  onBackToMenu: () => void;
  onPlayAgain: () => void;
}

export const EndGameModal = ({ grid, onBackToMenu, onPlayAgain }: MyProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!grid.find((e) =>
      e.type === GridElementType.EMPTY)) {
      setIsVisible(true);
    }
  }, [grid]);

  const handleModalCloseNavigateToMenu = () => {
    setIsVisible(false);
    onBackToMenu();
  };

  const handleModalCloseNavigateToNewGame = () => {
    setIsVisible(false);
    onPlayAgain();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={handleModalCloseNavigateToMenu}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>GAME OVER</Text>
          <ButtonElement text="Play Again" onPress={handleModalCloseNavigateToNewGame} />
          <ButtonElement text="Back to menu" onPress={handleModalCloseNavigateToMenu} />
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
    marginBottom: vw(5),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vw(5),
  },
});
