import React from 'react';
import {
  Modal, StyleSheet, Text, View,
} from 'react-native';
import { vw } from '../../../utils';
import { ButtonElement } from '../../common/ButtonElement';

interface Props {
  isVisible: boolean;
  onShowAdsPress: () => void;
  onBackToGamePress: () => void;
  isRewardAvailable: boolean;
}

export const NoUndoLeftModal = ({
  isVisible, onShowAdsPress, onBackToGamePress, isRewardAvailable,
}: Props) =>
  (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onBackToGamePress}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.titleText}>No more undos left :(</Text>
          <Text style={styles.descriptionText}>Watch some ads to get extra 5 undos!</Text>
          {!isRewardAvailable && (<Text style={styles.noRewardAvailableText}>Enable WiFi to load ads</Text>)}
          {isRewardAvailable && (<ButtonElement text="Get more!" onPress={onShowAdsPress} />)}
          {!isRewardAvailable
            && (<ButtonElement text="Get more!" onPress={() => {}} buttonStyle={styles.greyButton} />)}
          <ButtonElement text="Back to game" onPress={onBackToGamePress} />
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
  noRewardAvailableText: {
    textAlign: 'center',
    padding: vw(6),
    fontSize: vw(4),
    color: 'darkgrey',
  },
  greyButton: {
    backgroundColor: 'grey',
  },
});
