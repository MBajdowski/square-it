import {Image, StyleSheet, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {vw} from "../../utils/dimetionsUtils";
import {useIsFocused} from "@react-navigation/native";
import {AnimatedTextElement} from "./AnimatedTextElement";
import {ButtonElement} from "../common/ButtonElement";
import {
    GameInProgressKey,
    HighScoreKey,
    removeAllKeys,
    retrieveNumber,
    retrieveObject
} from "../../utils/asyncStorageUtils";
import {BackgroundComponent} from "../common/BackgroundComponent";

interface Props {
    navigation: NativeStackNavigationProp<any>
}

export const MenuPage = ({navigation}: Props) => {

    const [highScore, setHighScore] = useState(0);
    const [isResumeVisible, setIsResumeVisible] = useState(false);

    const isPageVisible = useIsFocused();

    const setRetrievedScore = useCallback(async () => {
        const retrievedHighScore = await retrieveNumber(HighScoreKey);
        setHighScore(retrievedHighScore);
    }, []);

    useEffect(() => {
        setRetrievedScore();
        initState();
    }, [isPageVisible, setRetrievedScore]);

    const initState = async () => {
        let isResumeVisible = await retrieveObject(GameInProgressKey);

        setIsResumeVisible(isResumeVisible);
    }

    const onNewGamePress = async () => {
        await removeAllKeys()
        navigation.navigate('GridPage');
    }

    return (
        <View style={styles.topContainer}>
            <BackgroundComponent img={require("../../assets/bg.png")}/>
            <View style={styles.imageContainer}>
                <Image style={styles.titleImg} source={require('../../assets/title.png')}/>
                <Image style={styles.logoImg} source={require('../../assets/logo_color_bg.png')}/>
                <AnimatedTextElement text={`High Score: ${highScore}`}/>
            </View>
            <View style={styles.buttonsContainer}>
                <ButtonElement text='New game' onPress={onNewGamePress}/>
                {isResumeVisible && <ButtonElement text='Resume' onPress={() => {
                    navigation.navigate('GridPage');
                }}/>}
                <ButtonElement text='How to play' onPress={() => {
                    navigation.navigate('BasicInstructionPage');
                }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff"
    },
    buttonsContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logoImg: {
        width: vw(50),
        height: vw(50),
        backgroundColor: "#fff"
    },
    titleImg: {
        height: vw(20),
        width: vw(70),
        resizeMode: 'center'
    }
});