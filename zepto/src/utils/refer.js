import { getCapitalLetters } from "./order";

export const generateReferralId = () => {
  const charactersString = getCapitalLetters();
  const length = charactersString.length;
  let randomReferralId = "";
  for (let i = 0; i < 6; i++)
    randomReferralId += charactersString[Math.floor(Math.random() * length)];
  return randomReferralId;
};
