// import MintError from '../../enums/mint-error';
import ICommand from '../../interfaces/command.interface';
import MintState from '../../types/mint-state';
import StoreIpfsObjectCommand from './store-ipfs-object-command';
import LedaNftService from '../../../../features/leda-nft/services/leda-nft.service';

import MintNftCommand from './mint-nft-command';

const storeIpfsObjectCommandMock = {
  execute: jest.fn(),
};

describe('MintNftCommand', () => {
  let storeIpfsObjectCommand: ICommand<MintState>;

  beforeAll(() => {
    // console.log("imageServiceMock", imageServiceMock);
    const ledaNftService = new LedaNftService();
    const mintNftCommand = new MintNftCommand(ledaNftService);
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

        // imageServiceMock.upload.mockResolvedValue(Promise.resolve(cid));

        storeIpfsObjectCommandMock.execute.mockResolvedValue(Promise.resolve(stateCid));
      });
    });
  });
});
