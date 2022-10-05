export type IpfsAttribute = {
  trait_type: string;
  value: string;
};

export type IpfsObjectRequest = {
  image: File;
  name: string;
  description: string;
  attributes: IpfsAttribute[];
};

export type IpfsObjectResponse = {
  image: string;
  name: string;
  description: string;
  attributes: IpfsAttribute[];
};
