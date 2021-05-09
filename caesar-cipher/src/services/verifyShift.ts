export const verifyShift = (value: string): number => {
  const parsedValue = parseInt(value, 10);

  if (isNaN(parsedValue)) {
    process.stderr.write('Error: shift value is not a number  \n\n');
    process.exit(9);
  }
  return parsedValue;
}
