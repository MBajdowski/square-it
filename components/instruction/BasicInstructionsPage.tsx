import React from "react";
import {InstructionContainerComponent} from "./InstructionContainerComponent";
import {StyleSheet, View} from "react-native";
import {InstructionComponent} from "./InstructionComponent";

export const BasicInstructionsPage = () => {

    return (
        <InstructionContainerComponent title="Basic Instruction">
            <View style={styles.mainContainer}>
                <InstructionComponent
                    text={'Place number from the bottom on the grid'}
                    images={[require("../../assets/logo.png")]}
                />
                <InstructionComponent
                    text={'Two the same numbers will merge'}
                    images={[require("../../assets/logo.png"), require("../../assets/bg.png")]}
                />
                <InstructionComponent
                    text={'Grey tiles will block space on grid'}
                    images={[require("../../assets/logo.png"), require("../../assets/bg.png"), require("../../assets/logo.png")]}
                />
                <InstructionComponent
                    text={'Two gray tiles will merge into black, two black tiles will disappear!'}
                    images={[require("../../assets/bg.png"), require("../../assets/logo.png")]}
                />
            </View>
        </InstructionContainerComponent>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        display: "flex"
    }
});