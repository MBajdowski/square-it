export interface ProbabilityValue {
  value: number,
  probability: number
}

export const getRandomWithProbability = (probValues: ProbabilityValue[]): number => {
  const arrayOfValues = [];

  for (let i = 0; i < probValues.length; i += 1) {
    for (let j = 0; j < probValues[i].probability; j += 1) {
      arrayOfValues.push(probValues[i].value);
    }
  }

  const randomIndex = Math.floor(Math.random() * arrayOfValues.length);

  return arrayOfValues[randomIndex];
};
