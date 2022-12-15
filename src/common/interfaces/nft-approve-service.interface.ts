interface INftApproveService {
  approveForAll(address: string): Promise<void>;
  isApproveForAll(ownerAddress: string, marketPlaceAddress: string): Promise<Boolean | undefined>;
}

export default INftApproveService;
