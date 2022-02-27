import {GridElementState, GridElementType} from "./types";
import {getRandomWithProbability, ProbabilityValue} from "./mathUtils";

const probabilities: ProbabilityValue[] = [
    {value: 1, probability: 12},//1
    {value: 2, probability: 6},//2
    {value: 3, probability: 1},//4
    {value: 4, probability: 2},//blocker
    {value: 5, probability: 1}//joker
];

export const emptyElement = (x: number, y: number): GridElementState => {
    return {
        x: x,
        y: y,
        bonus: false,
        type: GridElementType.EMPTY,
        value: 0
    }
}

export const blockedElement = (x: number, y: number): GridElementState => {
    return {
        x: x,
        y: y,
        bonus: false,
        type: GridElementType.BLOCKED,
        value: 1
    }
}

export const jokerElement = (x: number, y: number): GridElementState => {
    return {
        x: x,
        y: y,
        bonus: false,
        type: GridElementType.JOKER,
        value: 0
    }
}

export const newValueElement = (x: number, y: number): GridElementState => {
    return {
        x: x,
        y: y,
        bonus: false,
        type: GridElementType.VALUE,
        value: 1
    }
}

export const newValueElementWithValue = (x: number, y: number, value: number): GridElementState => {
    return {
        x: x,
        y: y,
        bonus: false,
        type: GridElementType.VALUE,
        value: value
    }
}

export const getRandomNewElement = (): GridElementState => {
    let randomValue = getRandomWithProbability(probabilities);
    let element: GridElementState = newValueElement(-1, -1);

    switch (randomValue) {
        case 1:
            element = newValueElement(-1, -1);
            break;
        case 2:
            element = newValueElementWithValue(-1, -1, 2);
            break;
        case 3:
            element = newValueElementWithValue(-1, -1, 4);
            break;
        case 4:
            element = blockedElement(-1, -1);
            break;
        case 5:
            element = jokerElement(-1, -1);
            break;
    }

    return element;
};