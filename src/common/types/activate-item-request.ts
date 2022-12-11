import ItemImage from './item-image';

type ActivateItemRequest = {
  itemId: string;
  address: string;
  image: ItemImage;
  tokenId: number;
  collection: {
    name: string;
    description: string;
    image: ItemImage;
  };
};

export default ActivateItemRequest;
