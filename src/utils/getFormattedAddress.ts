export const formattedAddress = (address: string) =>
  `${address.substring(0, 7)}...${address.substring(address.length - 4, address.length)}`;
