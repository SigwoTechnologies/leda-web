export const decimalCount = (num: string) => {
  if (num.includes('.')) {
    return num.split('.')[1].length;
  }

  if (num.includes(',')) {
    return num.split('.')[1].length;
  }

  return 0;
};
