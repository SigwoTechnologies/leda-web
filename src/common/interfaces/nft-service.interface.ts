import INftApproveService from './nft-approve-service.interface';
import INftInitService from './nft-init-service.interface';
import INftMintService from './nft-mint-service.interface';

interface INftService extends INftInitService, INftApproveService, INftMintService {}

export default INftService;
