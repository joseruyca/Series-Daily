function exactOrWrong(guessValue, targetValue) {
  return guessValue === targetValue ? "exact" : "wrong";
}

export function compareCharacterGuess(guess, target) {
  const occupationState =
    guess.occupation === target.occupation
      ? "exact"
      : guess.occupationGroup === target.occupationGroup
        ? "near"
        : "wrong";

  const debutState =
    guess.debutSeason === target.debutSeason
      ? "exact"
      : Math.abs(guess.debutSeason - target.debutSeason) === 1
        ? "near"
        : "wrong";

  const debutDirection =
    guess.debutSeason === target.debutSeason
      ? null
      : guess.debutSeason < target.debutSeason
        ? "up"
        : "down";

  return {
    name: { value: guess.name, state: guess.name === target.name ? "exact" : "wrong" },
    type: { value: guess.type, state: exactOrWrong(guess.type, target.type) },
    gender: { value: guess.gender, state: exactOrWrong(guess.gender, target.gender) },
    nationality: { value: guess.nationality, state: exactOrWrong(guess.nationality, target.nationality) },
    circle: { value: guess.circle, state: exactOrWrong(guess.circle, target.circle) },
    occupation: { value: guess.occupation, state: occupationState },
    debutSeason: { value: guess.debutSeason, state: debutState, direction: debutDirection },
  };
}