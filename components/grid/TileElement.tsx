import React, {useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {GridElementState, GridElementType} from "../../utils/types";
import {vw} from "../../utils/dimetionsUtils";
import {PlusIcon} from "../icons/PlusIcon";

interface Props {
    element: GridElementState,
    handlePress: (element: GridElementState) => void;
}

const calculateHslValue = (element: GridElementState) => {
    const hslValue = (160 + Math.log2(element.value) * 15) % 360;
    return 'hsl(' + hslValue + ', 80%, 90%)';
};

export const TileElement = ({element, handlePress}: Props) => {
    const [lastChangedValue, setLastChangedValue] = useState<GridElementState>({...element});
    const opacity = useRef(new Animated.Value(1));

    useEffect(() => {
        if (element.type === GridElementType.EMPTY && lastChangedValue.type !== element.type) {
            Animated.timing(opacity.current, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start(() => {
                opacity.current = new Animated.Value(1);
                setLastChangedValue({...element});
            });
        } else {
            setLastChangedValue({...element});
        }
    }, [element]);

    return (
        <View style={styles.gridContainer}>
            <TouchableWithoutFeedback onPress={() => handlePress(lastChangedValue)}>
                <View style={styles.middleContainer}>
                    {
                        lastChangedValue.type === GridElementType.EMPTY &&
                        <View style={styles.emptyContainer}/>}
                    {
                        lastChangedValue.type === GridElementType.VALUE &&
                        <Animated.View style={[
                            styles.valueContainer,
                            lastChangedValue.bonus ? styles.bonusBorder : styles.normalBorder,
                            {opacity: opacity.current, backgroundColor: calculateHslValue(lastChangedValue)}]}>
                            <Text style={styles.valueTextContainer}>{lastChangedValue.value}</Text>
                        </Animated.View>
                    }
                    {
                        lastChangedValue.type === GridElementType.BLOCKED &&
                        <Animated.View
                            style={[lastChangedValue.value === 1 ? styles.blockedContainer1 : styles.blockedContainer2,
                                {opacity: opacity.current}]}/>
                    }
                    {
                        lastChangedValue.type === GridElementType.JOKER &&
                        <View style={[styles.jokerContainer, styles.normalBorder]}>
                            <PlusIcon height={vw(7)} fill={"black"}/>
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>

    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",

        padding: vw(0.5)
    },

    middleContainer: {
        flex: 1,
        display: "flex",
        alignItems: "stretch",

        padding: vw(1),
        backgroundColor: "white"

    },

    valueContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: vw(0.7)
    },

    valueTextContainer: {
        fontWeight: "bold",
        fontSize: vw(5)
    },

    normalBorder: {
        borderColor: "#3b3b3b"
    },

    bonusBorder: {
        borderColor: "#991730"
    },

    emptyContainer: {
        flex: 1,

        backgroundColor: "white",
    },

    blockedContainer1: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "#a0a0a0",
    },

    blockedContainer2: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "#343434",
    },

    jokerContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#7acee2",
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: vw(0.7)
    }
});