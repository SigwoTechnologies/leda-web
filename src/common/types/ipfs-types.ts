export type IpfsAttribute = {
  trait_type: string;
  value: string;
};

export type Attribute = {
  [key: string]: any;
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
  attributes: Attribute;
  image: string;
};
