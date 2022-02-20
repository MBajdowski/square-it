import {Animated, StyleSheet} from "react-native";
import {vw} from "../../utils/dimetionsUtils";
import React, {useEffect, useRef} from "react";

interface Props {
    bonus: boolean;
}

export const AnimatedBonusPointsElement = ({bonus}: Props) => {

    const scaleValue = useRef(new Animated.Value(1));
    const opacityValue = useRef(new Animated.Value(0));

    useEffect(() => {
        if (bonus) {
            opacityValue.current = new Animated.Value(1);
            Animated.parallel([
                    Animated.timing(scaleValue.current, {
                        toValue: 7,
                        duration: 1000,
                        useNativeDriver: false
                    }),
                    Animated.timing(opacityValue.current, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: false
                    })
                ]
            ).start()
        }
    }, [bonus]);

    return (
        <Animated.Text
            style={[styles.highScoreText,
                {transform: [{scale: scaleValue.current}]},
                {opacity: opacityValue.current}]}>
            3
        </Animated.Text>
    );
}

const styles = StyleSheet.create({
    highScoreText: {
        flex: 1,
        fontWeight: "bold",
        color: "yellow",
        padding: vw(3)
    }
});