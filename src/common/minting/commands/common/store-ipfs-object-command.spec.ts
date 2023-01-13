import { Item } from '../../../../types/item';
import MintError from '../../enums/mint-error.enum';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import StoreIpfsObjectCommand from './store-ipfs-object-command';

const imageServiceMock = {
  upload: jest.fn(),
  uploadCollectionImage: jest.fn(),
  formatImageUrl: jest.fn(),
};

describe('StoreIpfsObjectCommand', () => {
  let storeIpfsObjectCommand: ICommand<MintState>;

  beforeAll(() => {
    storeIpfsObjectCommand = new StoreIpfsObjectCommand(imageServiceMock);
  });

  describe('When calling function execute', () => {
    describe('and execution is successful', () => {
      it('should assign the cid value correctly', async () => {
        const collection = {
          image: {
            cid: 'cidValue123',
            url: 'url',
          },
        };
        const state = {
          blob: { name: 'test' } as File,
          item: { itemId: '123' } as Item,
          collection,
        } as MintState;

        const cid = 'cidValue123';
        const expected = {
          ...state,
          cid,
        };

        imageServiceMock.upload.mockResolvedValue(Promise.resolve(cid));
        // imageServiceMock.uploadCollectionImage.mockResolvedValue(Promise.resolve(cid));

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and blob file is not provided', () => {
      it('should assign a RequiredBlobFile to state', async () => {
        const state = {} as MintState;

        const expected = { ...state, error: MintError.RequiredBlobFile };

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and item is not provided', () => {
      it('should assign a RequiredItemId error to state', async () => {
        const state = {
          blob: { name: 'test' } as File,
        } as MintState;

        const expected = { ...state, error: MintError.RequiredItemId };

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and image service upload function fails', () => {
      it('should assign an IpfsStoreFailure to state', async () => {
        const state = {
          blob: { name: 'test' } as File,
          item: { itemId: '123' } as Item,
        } as MintState;

        const expected = { ...state, error: MintError.IpfsStoreFailure };

        imageServiceMock.upload.mockRejectedValue('something went wrong.');

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
