import React from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InstructionComponent } from './InstructionComponent';
import { BackgroundComponent } from '../common/BackgroundComponent';
import { ButtonElement } from '../common/ButtonElement';
import { vw } from '../../utils/dimetionsUtils';
import * as bgImg from '../../assets/bg.png';
import * as blackedMerged from '../../assets/instruction/blackedMerged.png';
import * as plusTwoPairsMerged from '../../assets/instruction/plusTwoPairsMerged.png';
import * as plusMerged from '../../assets/instruction/plusMerged.png';
import * as black from '../../assets/instruction/black.png';
import * as multiComboMerged from '../../assets/instruction/multiComboMerged.png';
import * as _blackGrey from '../../assets/instruction/_blackGrey.png';
import * as _grey from '../../assets/instruction/_grey.png';
import * as _holder from '../../assets/instruction/_holder.png';
import * as _init from '../../assets/instruction/_init.png';
import * as two from '../../assets/instruction/two.png';
import * as plusNoPairsGrey from '../../assets/instruction/plusNoPairsGrey.png';
import * as plusGreyMerged from '../../assets/instruction/plusGreyMerged.png';
import * as onesMerged from '../../assets/instruction/onesMerged.png';
import * as _undo from '../../assets/instruction/_undo.png';
import * as _plusTwoPairs from '../../assets/instruction/_plusTwoPairs.png';
import * as _plusNoPairs from '../../assets/instruction/_plusNoPairs.png';
import * as _plusGrey from '../../assets/instruction/_plusGrey.png';
import * as _plus from '../../assets/instruction/_plus.png';
import * as _ones from '../../assets/instruction/_ones.png';
import * as _one from '../../assets/instruction/_one.png';
import * as _multiCombo from '../../assets/instruction/_multiCombo.png';

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const BasicInstructionsPage = ({ navigation }: Props) =>
  (

    <View style={styles.mainContainer}>
      <BackgroundComponent img={bgImg} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>How To Play</Text>
        <ButtonElement
          text="<"
          onPress={() => {
            navigation.goBack();
          }}
          buttonStyle={styles.button}
        />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <InstructionComponent
            text="Place number from the bottom on the grid"
            images={[_init]}
          />
          <InstructionComponent
            text="Pair of tiles will merge"
            images={[_one, two]}
          />
          <InstructionComponent
            text="Grey tiles will block space on grid. Two gray tiles will merge into black tile"
            images={[_grey, black]}
          />
          <InstructionComponent
            text="Two black tiles will disappear. You will score additional points for clearing black tiles"
            images={[_blackGrey, blackedMerged]}
          />
          <InstructionComponent
            text="Use tile holder to save drawn tile for later"
            images={[_holder]}
          />
          <InstructionComponent
            text="Use arrow to undo one step"
            images={[_undo]}
          />
          <InstructionComponent
            text="Plus tile can merge pair of tiles"
            images={[_plus, plusMerged]}
          />
          <InstructionComponent
            text="Plus tile will always merge bigger pair"
            images={[_plusTwoPairs, plusTwoPairsMerged]}
          />
          <InstructionComponent
            text="Plus tile will become grey tile if no pairs will be find"
            images={[_plusNoPairs, plusNoPairsGrey]}
          />
          <InstructionComponent
            text="Plus tile can merge grey and black tiles!"
            images={[_plusGrey, plusGreyMerged]}
          />
          <InstructionComponent
            text="Merge one or more tiles to get bonus points. Gold border will indicate that you scored bonus"
            images={[_ones, onesMerged]}
          />
          <InstructionComponent
            text="Perform multi combo to get even more bonus points!"
            images={[_multiCombo, multiComboMerged]}
          />
        </ScrollView>
      </View>
    </View>
  );

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    display: 'flex',
  },
  titleContainer: {
    flex: 1,

    display: 'flex',
    justifyContent: 'center',

    marginHorizontal: vw(5),
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: vw(9),
  },
  scrollContainer: {
    flex: 5,

    marginHorizontal: vw(5),
    backgroundColor: 'rgba(229, 219, 206, 0.5)',
    borderTopLeftRadius: vw(5),
    borderTopRightRadius: vw(5),
  },
  button: {
    position: 'absolute',
    width: vw(12),
    marginBottom: 0,
    paddingTop: vw(2),
    paddingBottom: vw(3),
  },
});
