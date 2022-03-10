export interface GridElementState {
  x: number;
  y: number;
  type: GridElementType;
  value: number;
  bonus?: boolean;
  levelTile?: GridElementState;
}

export enum GridElementType {
  EMPTY,
  BLOCKED,
  VALUE,
  JOKER,
}

export const N = 5;

export interface GameLevel {
  id: number;
  levelGrid: GridElementState[];
}
