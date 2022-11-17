import ItemImage from './item-image';

type ActivateItemRequest = {
  itemId: string;
  address: string;
  image: ItemImage;
  tokenId: number;
};

export default ActivateItemRequest;
