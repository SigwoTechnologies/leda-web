import ItemStatus from '../minting/enums/item-status.enum';
import ItemImage from './item-image';

type ItemRequest = {
  address: string;
  collectionAddress: string;
  description: string;
  image: ItemImage;
  name: string;
  price: number;
  royalty: number;
  status: ItemStatus;
  tokenId: number;
};

export default ItemRequest;
