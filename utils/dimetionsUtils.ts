import {Dimensions} from 'react-native';

export const vh = (percentage: number): number => {
    const viewportHeight = Dimensions.get('window').height;
    const decimal = percentage / 100;

    return Math.round(viewportHeight * decimal);
};

export const vw = (percentage: number): number => {
    const viewportWidth = Dimensions.get('window').width;
    const decimal = percentage / 100;

    return Math.round(viewportWidth * decimal);
};

export const noOfRows = (height: number): number => {
    const viewportHeight = Dimensions.get('window').height;

    return Math.round(viewportHeight / height) + 1;
}