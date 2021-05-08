export const isLowerCase = (letter: string): boolean => {
  if (letter === letter.toLowerCase()) {
    return true;
  }
  return false;
}
