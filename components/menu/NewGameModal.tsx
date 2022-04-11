import React from 'react';
import {
  Modal, StyleSheet, Text, View,
} from 'react-native';
import { vw } from '../../utils';
import { ButtonElement } from '../common/ButtonElement';

interface Props {
  isVisible: boolean;
  onNewGamePress: () => void;
  onBackToMenuPress: () => void;
}

export const NewGameModal = ({ isVisible, onNewGamePress, onBackToMenuPress }: Props) =>
  (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onBackToMenuPress}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>Game in progress</Text>
          <Text style={styles.descriptionText}>Are you sure you want aboard current game and start fresh?</Text>
          <ButtonElement text="Yes" onPress={onNewGamePress} />
          <ButtonElement text="Back to menu" onPress={onBackToMenuPress} />
        </View>
      </View>
    </Modal>
  );

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
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vw(5),
  },
  descriptionText: {
    textAlign: 'center',
    padding: vw(6),
    fontSize: vw(5),
  },
});
