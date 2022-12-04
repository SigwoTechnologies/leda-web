export const formattedAddress = (address: string) => {
  if (address)
    return `${address.substring(0, 7)}...${address.substring(address.length - 4, address.length)}`;
  return address;
};
