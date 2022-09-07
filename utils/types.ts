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

export const ADS_ENABLED = true;
export const PERSONALIZED_ADS = false;

// TEST ADMOB
/* export const ADMOB_TEST_BANNER = 'ca-app-pub-3940256099942544/6300978111';
export const ADMOB_TEST_FS_REWARD = 'ca-app-pub-3940256099942544/5224354917';
export const ADMOB_TEST_FS = 'ca-app-pub-3940256099942544/1033173712'; */

// PROD ADMOB
export const ADMOB_TEST_BANNER = 'ca-app-pub-4876246469575097/1626411742';
export const ADMOB_TEST_FS_REWARD = 'ca-app-pub-4876246469575097/1678382633';
export const ADMOB_TEST_FS = 'ca-app-pub-4876246469575097/4496117660';
