import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import GetIpfsMetadataCommand from './get-ipfs-metadata-command';

const imageServiceMock = {
  upload: jest.fn(),
};

const storeIpfsObjectCommand = {
  execute: jest.fn(),
};

describe('GetIpfsMetadataCommand', () => {
  let getIpfsMetadataCommand: ICommand<MintState>;

  beforeAll(() => {
    getIpfsMetadataCommand = new GetIpfsMetadataCommand();
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
        const stateCid = { ...state, cid };

        imageServiceMock.upload.mockResolvedValue(Promise.resolve(cid));

        storeIpfsObjectCommand.execute.mockResolvedValue(Promise.resolve(state));

        const actual = await getIpfsMetadataCommand.execute(state);
      });
    });
  });
});
