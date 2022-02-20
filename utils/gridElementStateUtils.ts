import {GridElementState, GridElementType} from "./types";

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