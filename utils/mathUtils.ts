export interface ProbabilityValue {
    value: number,
    probability: number
}

export const getRandomWithProbability = (probValues: ProbabilityValue[]): number => {
    let arrayOfValues = [];

    for (let i = 0; i < probValues.length; i++) {
        for (let j = 0; j < probValues[i].probability; j++) {
            arrayOfValues.push(probValues[i].value)
        }
    }

    let randomIndex = Math.floor(Math.random() * arrayOfValues.length);

    return arrayOfValues[randomIndex];
};