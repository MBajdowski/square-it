import AsyncStorage from '@react-native-async-storage/async-storage';

export const HighScoreKey = '@high_score';
export const GridKey = '@grid';
export const TileHolderElementKey = '@tile_holder_element';
export const NewElementKey = '@new_element';
export const CurrentScoreKey = '@current_score';
export const GameInProgressKey = '@game_in_progress';
export const PrevGridKey = '@prev_grid';
export const PrevNewElementKey = '@prev_new_element';
export const PrevScoreKey = '@prev_score';
export const UndoAvailableKey = '@undo_available';
export const CompletedLevelsKey = '@completed_levels';

export const removeCurrentGameData = async () => {
    removeKey(GridKey);
    removeKey(TileHolderElementKey);
    removeKey(NewElementKey);
    removeKey(CurrentScoreKey);
    removeKey(GameInProgressKey);
    removeKey(PrevGridKey);
    removeKey(PrevNewElementKey);
    removeKey(PrevScoreKey);
    removeKey(UndoAvailableKey);
}

export const removeKey = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        //TODO: Error saving datanpm build
    }
}

export const storeObject = async (key: string, objectToStore: any) => {
    try {
        let json = JSON.stringify(objectToStore);

        await AsyncStorage.setItem(key, json);
    } catch (error) {
        //TODO: Error saving datanpm build
    }
}

export const retrieveObject = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        //TODO: Error retrieving data
    }
}

export const storeNumber = async (key: string, numberToStore: number) => {
    try {
        await AsyncStorage.setItem(
            key,
            numberToStore.toString()
        );
    } catch (error) {
        //TODO: Error saving datanpm build
    }
};


export const retrieveNumber = async (key: string): Promise<number> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return +value;
        }
    } catch (error) {
        //TODO: Error retrieving data
    }

    return 0;
};