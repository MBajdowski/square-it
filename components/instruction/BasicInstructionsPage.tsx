import React from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InstructionComponent } from './InstructionComponent';
import { BackgroundComponent } from '../common/BackgroundComponent';
import { ButtonElement } from '../common/ButtonElement';
import { vw } from '../../utils';

interface Props {
  navigation: NativeStackNavigationProp<any>
}

export const BasicInstructionsPage = ({ navigation }: Props) =>
  (

    <View style={styles.mainContainer}>
      <BackgroundComponent img={require('../../assets/bg.png')} />
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
            images={[require('../../assets/instruction/_init.png')]}
          />
          <InstructionComponent
            text="Pair of tiles will merge"
            images={[require('../../assets/instruction/_one.png'),
              require('../../assets/instruction/two.png')]}
          />
          <InstructionComponent
            text="Grey tiles will block space on grid. Two gray tiles will merge into black tile"
            images={[require('../../assets/instruction/_grey.png'),
              require('../../assets/instruction/black.png')]}
          />
          <InstructionComponent
            text="Two black tiles will disappear. You will score additional points for clearing black tiles"
            images={[require('../../assets/instruction/_blackGrey.png'),
              require('../../assets/instruction/blackedMerged.png')]}
          />
          <InstructionComponent
            text="Use tile holder to save drawn tile for later"
            images={[require('../../assets/instruction/_holder.png')]}
          />
          <InstructionComponent
            text="Use arrow to undo one step"
            images={[require('../../assets/instruction/_undo.png')]}
          />
          <InstructionComponent
            text="Plus tile can merge pair of tiles"
            images={[require('../../assets/instruction/_plus.png'),
              require('../../assets/instruction/plusMerged.png')]}
          />
          <InstructionComponent
            text="Plus tile will always merge bigger pair"
            images={[require('../../assets/instruction/_plusTwoPairs.png'),
              require('../../assets/instruction/plusTwoPairsMerged.png')]}
          />
          <InstructionComponent
            text="Plus tile will become grey tile if no pairs will be find"
            images={[require('../../assets/instruction/_plusNoPairs.png'),
              require('../../assets/instruction/plusNoPairsGrey.png')]}
          />
          <InstructionComponent
            text="Plus tile can merge grey and black tiles!"
            images={[require('../../assets/instruction/_plusGrey.png'),
              require('../../assets/instruction/plusGreyMerged.png')]}
          />
          <InstructionComponent
            text="Merge one or more tiles to get bonus points. Gold border will indicate that you scored bonus"
            images={[require('../../assets/instruction/_ones.png'),
              require('../../assets/instruction/onesMerged.png')]}
          />
          <InstructionComponent
            text="Perform multi combo to get even more bonus points!"
            images={[require('../../assets/instruction/_multiCombo.png'),
              require('../../assets/instruction/multiComboMerged.png')]}
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
