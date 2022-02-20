export interface GridElementState {
    x: number;
    y: number;
    type: GridElementType;
    value: number;
    bonus: boolean;
}

export enum GridElementType {
    EMPTY,
    BLOCKED,
    VALUE,
    JOKER
}

export const N = 5;