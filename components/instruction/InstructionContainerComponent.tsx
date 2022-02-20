import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {vw} from "../../utils/dimetionsUtils";
import {BackgroundComponent} from "../common/BackgroundComponent";
import {ButtonElement} from "../common/ButtonElement";

interface Props {
    title: string
}

export const InstructionContainerComponent: React.FunctionComponent<Props> = ({title, children}) => {

    return (
        <View style={styles.mainContainer}>
            <BackgroundComponent img={require('../../assets/bg.png')}/>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>

            <View style={styles.childrenContainer}>
                {children}
            </View>
            <View style={styles.buttonsContainer}>
                <ButtonElement text="&#8810; BACK" onPress={() => {
                }} buttonStyle={styles.buttonStyle}/>
                <ButtonElement text="NEXT &#8811;" onPress={() => {
                }} buttonStyle={styles.buttonStyle}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,

        display: "flex"
    },
    titleContainer: {
        flex: 1,

        display: "flex",
        justifyContent: "center"
    },
    titleText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: vw(8)
    },
    childrenContainer: {
        flex: 8,

        display: "flex"
    },
    buttonsContainer: {
        flex: 1,

        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around"
    },
    buttonStyle: {
        width: vw(40)
    }
});