import MintError from '../../enums/mint-error';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import StoreIpfsObjectCommand from './store-ipfs-object-command';

const imageServiceMock = {
  upload: jest.fn(),
};

describe('StoreIpfsObjectCommand', () => {
  let storeIpfsObjectCommand: ICommand<MintState>;

  beforeAll(() => {
    storeIpfsObjectCommand = new StoreIpfsObjectCommand(imageServiceMock);
  });

  describe('When calling function execute', () => {
    describe('and execution is successful', () => {
      it('should assign the cid value correctly', async () => {
        const state = {
          blob: { name: 'test' } as File,
          name: 'test',
          description: 'description test',
        } as MintState;

        const cid = 'cidValue123';
        const expected = { ...state, cid };

        imageServiceMock.upload.mockResolvedValue(Promise.resolve(cid));

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and blob file is not provided', () => {
      it('should assign a RequiredBlobFile to state', async () => {
        const state = {} as MintState;

        const expected = { error: MintError.RequiredBlobFile };

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and name is not provided', () => {
      it('should assign a RequiredName to state', async () => {
        const state = { blob: { name: 'test' } as File } as MintState;

        const expected = { ...state, error: MintError.RequiredName };

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and description is not provided', () => {
      it('should assign a RequireDescription to state', async () => {
        const state = { blob: { name: 'test' } as File, name: 'test' } as MintState;

        const expected = { ...state, error: MintError.RequireDescription };

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('and image service upload function fails', () => {
      it('should assign an IpfsStoreFailure to state', async () => {
        const state = {
          blob: { name: 'test' } as File,
          name: 'test',
          description: 'test',
        } as MintState;

        const expected = { ...state, error: MintError.IpfsStoreFailure };

        imageServiceMock.upload.mockRejectedValue('something went wrong.');

        const actual = await storeIpfsObjectCommand.execute(state);

        expect(actual).toEqual(expected);
      });
    });
  });
});
