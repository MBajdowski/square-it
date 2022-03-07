import React from "react";
import {StyleSheet, View} from 'react-native';
import {GridPage} from "./components/grid/GridPage";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MenuPage} from "./components/menu/MenuPage";
import {BasicInstructionsPage} from "./components/instruction/BasicInstructionsPage";
import {LevelsPage} from "./components/levels/LevelsPage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
});

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MenuPage"
                        component={MenuPage}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="GridPage"
                        component={GridPage}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="LevelsPage"
                        component={LevelsPage}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="BasicInstructionPage"
                        component={BasicInstructionsPage}
                        options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
