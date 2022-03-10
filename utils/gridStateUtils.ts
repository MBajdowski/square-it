import { GridElementState, GridElementType, N } from './types';
import { blockedElement, emptyElement } from './gridElementStateUtils';

export const initGrid = (): GridElementState[] => {
  const grid: GridElementState[] = [];

  for (let y = 0; y < N; y += 1) {
    for (let x = 0; x < N; x += 1) {
      const element: GridElementState = emptyElement(x, y);
      grid.push(element);
    }
  }

  return grid;
};

export const hasPair = (grid: GridElementState[], e: GridElementState): boolean =>
  getPairs(grid, e).length > 0;

const isPairTop = (each: GridElementState, e: GridElementState) =>
  (each.x === e.x && each.y === (e.y - 1) && each.value === e.value && each.type === e.type);
const isPairBottom = (each: GridElementState, e: GridElementState) =>
  (each.x === e.x && each.y === (e.y + 1) && each.value === e.value && each.type === e.type);
const isPairLeft = (each: GridElementState, e: GridElementState) =>
  (each.y === e.y && each.x === (e.x - 1) && each.value === e.value && each.type === e.type);
const isPairRight = (each: GridElementState, e: GridElementState) =>
  (each.y === e.y && each.x === (e.x + 1) && each.value === e.value && each.type === e.type);

export const getPairs = (grid: GridElementState[], e: GridElementState): GridElementState[] =>
  grid.filter((each) =>
    isPairTop(each, e) || isPairBottom(each, e) || isPairLeft(each, e) || isPairRight(each, e));

const compareTwoElements = (v1: GridElementState, v2: GridElementState) => {
  if (v1.type === v2.type) {
    return v2.value - v1.value;
  }
  return v2.type - v1.type;
};

export const getFinalJokerElement = (grid: GridElementState[], e: GridElementState): GridElementState => {
  const sortedAdjacentElements: GridElementState[] = getAdjacent(grid, e)
    .filter((each) =>
      each.type !== GridElementType.EMPTY)
    .sort((v1, v2) =>
      compareTwoElements(v1, v2));
  const biggestNumber = blockedElement(e.x, e.y);
  // TODO: Poprawne zliczanie bonusu
  sortedAdjacentElements.forEach(((value, index, array) => {
    const hasNextElement = array.length > index + 1;
    const isNextElementTheSame = hasNextElement && value.value === array[index + 1].value
        && value.type === array[index + 1].type;

    if (isNextElementTheSame && compareTwoElements(biggestNumber, value) > 0) {
      biggestNumber.value = value.value;
      biggestNumber.type = value.type;
    }
  }));

  return biggestNumber;
};

const getAdjacent = (grid: GridElementState[], e: GridElementState): GridElementState[] =>
  grid.filter((each) =>
    (each.x === e.x && each.y === (e.y - 1))
        || (each.x === e.x && each.y === (e.y + 1))
        || (each.y === e.y && each.x === (e.x - 1))
        || (each.y === e.y && each.x === (e.x + 1)));

export const deepGridCopy = (grid: GridElementState[]): GridElementState[] =>
  JSON.parse(JSON.stringify(grid));
