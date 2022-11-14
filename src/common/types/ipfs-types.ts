export type IpfsAttribute = {
  trait_type: string;
  value: string;
};

export type PropertiesTypes = {
  key: string;
  value: string;
};

export type PinataResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate: boolean;
};

export type IpfsObjectRequest = {
  image: File;
  name: string;
  description: string;
  attributes: IpfsAttribute[];
};

export type IpfsObjectResponse = {
  attributes: PropertiesTypes;
  image: string;
};
