export const getFormattedName = (name: string) => {
  if (name.length <= 13) return name;

  return `${name.substring(0, 14)}...`;
};
