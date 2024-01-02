export const generateRandomString = (n: number): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbol = "!@&$";
  const allCharacters = characters + symbol;

  let result = "";
  const charactersLength = allCharacters.length;

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += allCharacters.charAt(randomIndex);
  }

  return result;
};
