export const decimalCount = (num: number) => {
  const numStr = String(num);

  if (numStr.includes('.')) {
    return numStr.split('.')[1].length;
  }

  return 0;
};
