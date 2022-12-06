interface IVoucherService {
  delete(voucherId: string): Promise<void>;
}

export default IVoucherService;
