type DraftItemRequest = {
  itemId: string;
  address: string;
  collectionAddress: string;
  description: string;
  name: string;
  tags: string[];
  royalty: number;
};

export default DraftItemRequest;
